import { stripe } from '$lib/server/checkout';
import { error, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export async function GET({ url }) {
	// const email = url.searchParams.get('email') ?? error(400);
	const prisma = new PrismaClient();

	const prismaWorkoutPlanClient = await prisma.workoutPlan.create({
		data: {
			customer_id: 'dasdasd',
			id: 'dasdasd',
			details: 'dasdasd',
			level: 'dasdasd',
			content: 'dasdasd',
			goal: 'dasdasd',
			facilities: 'dasdasd',
			order_id: 'dasdasd'
		}
	});

	const planCount = await prisma.workoutPlan.count({
		where: { customer_id: 'dasdasd' }
	});
	return new Response(JSON.stringify(planCount));
	// const customerMatches = await stripe.customers.list({
	// 	email, limit: 1
	// });
	//
	// let customer;
	// if (customerMatches.data.length == 0) {
	// 	customer = await stripe.customers.create({ email });
	// } else {
	// 	customer = customerMatches.data[0];
	// }
	//
	// const sessions = await stripe.checkout.sessions.list({
	// 	customer: customer.id
	// });

	// const prods = await stripe.customers.update(customer.id, {
	// 	metadata: {
	// 		foo: 'bar'
	// 	}
	// });

	// return new Response(JSON.stringify({ email, customerMatches, customer, sessions }), {
	// 	headers: {
	// 		'Content-type': 'application/json'
	// 	}
	// });
	// Getting payment intent and setting metadata

	// const session = await stripe.checkout.sessions.retrieve('cs_test_b1TSLxRoOzIbRoVGIk9gWTM46YGy6USBubEYDbTyObM7MQj20RYfxhn0WA');
	//
	// const paymentIntentId = (session.payment_intent ?? error(500)).toString();
	// const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, );
	//
	// return new Response(JSON.stringify(paymentIntent.metadata), {
	// 	headers: {
	// 		'Content-type': 'application/json'
	// 	}
	// });
}