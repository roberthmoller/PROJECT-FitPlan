import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGroq } from '@langchain/groq';
import { SECRET_GROQ_KEY } from '$env/static/private';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { isProduction } from '$lib/server/utils/env';

const chatGroq = new ChatGroq({ apiKey: SECRET_GROQ_KEY });
const chatOllama = new ChatOllama({ baseUrl: 'http://localhost:11434', model: 'mistral' });
const parser = new StringOutputParser();

export const example = `
## Schedule
- Day 1: Workout #1
- Day 2: Rest day
- Day 3: Workout #2
- Day 4: Rest day
- Day 5: Rest day
- Day 6: Workout #3
- Day 7: Rest day

---

### Workout #1: Cardio and Upper Body Strength Training (Home or Gym)
**Warm up:**
- 10 minutes of brisk walking (Home: on a treadmill or around the neighborhood; Gym: on a treadmill)

**Workout:**
- 3 sets of 8 modified pushups (Home or Gym: use a yoga mat)
- 3 sets of 5 assisted pull-ups (Gym: using an assisted pull-up machine; Home: using a resistance band over a door)
- 3 sets of 8 chair dips (Home: sturdy chair; Gym: bench)
- 2 sets of 12 dumbbell shoulder presses (Home: use your own weights; Gym: use gym dumbbells)
- 3 sets of 10 seated cable rows (Gym: cable machine; Home alternative: resistance band rows)

**Cool down:**
- 5 minutes of light walking (Home: in place or around the neighborhood; Gym: on a treadmill)
- 5 minutes of stretching focused on the upper body (Home or Gym)

---

### Workout #2: Leg Day and Core Strength (Home or Outdoor)
**Warm up:**
- 10 minutes of stationary cycling (Gym: stationary bike; Home: if you own a stationary bike)

**Workout:**
- 3 sets of 10 bodyweight squats (Outdoor: park or backyard; Home: any clear space)
- 3 sets of 8 lunges per leg (Outdoor: park or backyard; Home: any clear space)
- 3 sets of 10 lying leg raises (Home: on a yoga mat)
- 2 sets of 15 glute bridges (Home: on a yoga mat)
- 2 sets of 12 seated knee tucks (Home: on a bench; Outdoor: park bench)

**Cool down:**
- 5 minutes of gentle walking (Outdoor: in a park; Home: around the neighborhood)
- 5 minutes of stretching focusing on legs and lower back (Home or Outdoor)

---


### Workout #3: Full Body Light Circuit (Home, Gym, or Outdoor)
**Warm up:**
- 10 minutes of light jump rope (Outdoor: park; Home: suitable indoor space; Gym)

**Workout:**
- 3 sets of 8 kettlebell swings (Gym: use gym kettlebell; Home: use own kettlebell)
- 3 sets of 10 wall push-ups (Home: any wall; Outdoor: park wall)
- 3 sets of 10 step-ups (Outdoor: use park bench; Home: use sturdy step)
- 3 sets of 10 bird dogs (Home: on a yoga mat; Outdoor: on a clean surface)
- 2 sets of 15 second plank (Home: on a yoga mat; Outdoor: on a clean surface)

**Cool down:**
- 5 minutes of walking (Outdoor: park; Home: around the neighborhood)
- 5 minutes of full-body stretching including stretches that target the back (Home, Gym, or Outdoor)
`;

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
