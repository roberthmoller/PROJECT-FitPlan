import { checkout, mailer, trainer } from '$lib/server';
import { error } from '@sveltejs/kit';
import { orders, plans } from '$lib/server/database';
import { compile } from 'mdsvex';
import { renderWorkout } from '$lib/server/mails/workout-plan';


export async function POST({ request }) {
	console.log('💳\tVerifying purchase');
	const session = await checkout.onComplete(request);
	console.log(session);
	const { metadata, customer, customer_details, customer_email, payment_intent, id } = session;
	console.log('✅\tPurchase verified');


	const email = customer_details?.email ?? customer_email ?? error(400, 'No customer email provided');
	const { goal, details, level, gym, home, outside } = metadata ?? {};
	const facilities = [...facilitiesOf(gym, home, outside)];


	console.log('✍️\tCreating record');
	await orders.create({
		data: {
			customer: customer as string, details, level, goal, facilities, id
		}
	});
	console.log('✅\tRecord created');


	console.log('💭\tPlanning workouts');
	const rawWorkouts = await trainer.planWorkouts(goal, details, level, facilities);
	const strippedWorkouts = getStrippedWorkouts(rawWorkouts);
	const markdownWorkouts = await compile(strippedWorkouts);
	const htmlWorkouts = renderWorkout(markdownWorkouts?.code ?? '');
	console.log('🏃‍\tWorkouts planned');


	console.log('💾\tStoring workout plan');
	const storedPlan = await plans.create({
		data: {
			id, customer: customer as string, content: strippedWorkouts
		}
	});
	console.log('✅\tWorkout plan stored');

	console.log('💾\tMarking workout plan as generated');
	await orders.update({
		where: { id },
		data: { wasGenerated: strippedWorkouts !== undefined && storedPlan !== undefined }
	});
	console.log('✅\tWorkout plan stored');


	console.log('📧\tSending workout plan');
	const wasSent = await mailer.sendWorkout(htmlWorkouts, email!);
	console.log('✅\tWorkout plan sent');

	console.log('💾\tMarking order as fulfilled');
	await orders.update({
		where: { id },
		data: { wasSent }
	});
	console.log('✅\tOrder marked as fulfilled');

	return new Response(undefined, { status: 201 });
}

function* facilitiesOf(gym: string | undefined, home: string | undefined, outside: string | undefined): Generator<string> {
	if (gym) yield 'gym';
	if (home) yield 'home';
	if (outside) yield 'outside';
}

function getStrippedWorkouts(workouts: string) {
	const heading = '## Schedule\n';
	return heading + workouts.split(heading)[1];
}
