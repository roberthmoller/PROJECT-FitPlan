import { stripe } from '$lib/server/checkout';


export async function load({ cookies, params, url }) {
	const sessionId = params.id;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	const { metadata, customer, customer_details } = session;
	if (customer) cookies.set('customer_id', customer as string, { path: '/' });

	return { metadata };
}