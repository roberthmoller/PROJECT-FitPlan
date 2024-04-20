import { checkout, mailer, trainer } from '$lib/server';
import { error } from '@sveltejs/kit';
import { ProductStatus, stripe } from '$lib/server/checkout';


function getStrippedWorkouts(workouts: string) {
	const heading = '## Schedule\n';
	return heading + workouts.split(heading)[1];
}

export async function POST({ request }) {
	console.log('Verifying purchase');
	const session = await checkout.onComplete(request);
	console.log(session);
	const { metadata, customer, customer_details, customer_email, payment_intent, id } = session;

	// todo: If not already a saved customer, create one
	// stripe.customers.create({})

	const email = customer_details?.email ?? customer_email ?? error(400, 'No customer email provided');
	const { goal, details, level, gym, home, outside } = metadata ?? {};




	// console.log('Updating payment metadata', payment_intent, metadata);
	// const paymentIntentId = (payment_intent ?? error(500)).toString();
	// const paymentInPlanning = await stripe.paymentIntents.update(paymentIntentId, {
	// 	metadata: { ...metadata, status: ProductStatus.PLANNING }
	// });

	console.log('Planning workouts');
	const workouts = await trainer.planWorkouts(goal, details, level, [...facilities(gym, home, outside)]);
	const strippedWorkouts = getStrippedWorkouts(workouts);
	// const paymentInShipping = await stripe.paymentIntents.update(paymentIntentId, {
	// 	metadata: { ...paymentInPlanning.metadata, workouts, status: ProductStatus.SHIPPING }
	// });
	console.log('Sending workouts');
	await mailer.send(strippedWorkouts, email!);
	console.log('Workouts sent');
	// await stripe.paymentIntents.update(paymentIntentId, {
	// 	metadata: { ...paymentInShipping.metadata, status: ProductStatus.DELIVERED }
	// });
	return new Response(undefined, { status: 201 });
}

function* facilities(gym: string | undefined, home: string | undefined, outside: string | undefined) {
	if (gym) yield 'gym';
	if (home) yield 'home';
	if (outside) yield 'outside';
}