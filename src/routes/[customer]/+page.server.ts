import { orders } from '$lib/server/database';


export async function load({ cookies, params, url,request }) {
	const { customer } = params;
	// todo: Decrypt customer id

	if (cookies.get('customer_id') !== customer) {
		// todo: Encrypt customer id
		cookies.set('customer_id', customer, { path: '/' });
	}
	// const session = await stripe.checkout.sessions.retrieve(sessionId);
	// const { metadata, customer, customer_details } = session;

	return {
		orders: await orders.findMany({ where: { customer } })
	};
}

