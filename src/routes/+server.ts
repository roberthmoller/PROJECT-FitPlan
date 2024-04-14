import { checkout, mailer, trainer } from '$lib/server';


function getStrippedWorkouts(workouts: string) {
	const heading = '## Schedule\n';
	return heading + workouts.split(heading)[1];
}

export async function POST({ request }) {
	console.log('Verifying purchase');
	const { metadata, customer } = await checkout.onComplete(request);
	const { goal, details, level, gym, home, outside } = metadata;
	console.log('Planning workouts');
	const workouts = await trainer.planWorkouts(goal, details, level, [...facilities(gym, home, outside)]);
	const strippedWorkouts = getStrippedWorkouts(workouts);
	console.log('Sending workouts');
	await mailer.send(strippedWorkouts, customer.email);
	console.log('Workouts sent');
	return new Response(undefined, { status: 201 });
}

function* facilities(gym: string | undefined, home: string | undefined, outside: string | undefined) {
	if (gym) yield 'gym';
	if (home) yield 'home';
	if (outside) yield 'outside';
}