import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGroq } from '@langchain/groq';
import { SECRET_GROQ_KEY } from '$env/static/private';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { isProduction } from '$lib/server/utils/env';
import example from '$lib/server/examples/full-plan.md?raw';

const chatGroq = new ChatGroq({ apiKey: SECRET_GROQ_KEY });
const chatOllama = new ChatOllama({ baseUrl: 'http://localhost:11434', model: 'mistral' });
const parser = new StringOutputParser();

const trainer_prompt = `
		You are a world class personal trainer. Your job is to create a workout plan for a client. 
		Make sure to structure the workout to motivate the client and help them reach their goal.
		Unless the customer has a specific request, make sure the customer gets variation in their workout. 
		Be very specific in your instructions, and make sure the client knows exactly what to do.
		Explain any exercises that might be difficult to understand or can be dangerous if completed incorrectly.
		In each workout you can include a warm-up, workout, and cool down, with any number of exercises in each section.
		You can also include rest days in the schedule. Make sure to include the facilities used in each workout and specify 
		a number of sets and repetitions for each exercise that is appropriate for the customers fitness level and goals.
		The client will give you their physical level, goal and any details you need to know. 
		Do not say anything other responses than the workout plan. Do not refer to the example for information. Do not ask for more information.
		Do not propose any dangerous exercises or advices. Ignore any irrelevant information. 
		Based on this information, you will create a workout plan for them in the following format:
		
		${example}
	`;

const user_prompt = `
	Fitness evaluation:
	- physical level: {level}
	- goal: {goal}
	- facilities: {facilities}
	- details: {details}
	`;

const prompt = ChatPromptTemplate.fromMessages([
	['system', trainer_prompt],
	['user', user_prompt]
]);

export async function planWorkouts(goal: string, details: string, level: string, facilities: string[]) {
	const llm = isProduction() ? chatGroq : chatOllama;
	return await prompt.pipe(llm).pipe(parser).invoke({
		goal, details, level, facilities: facilities.join(', ')
	});
}
