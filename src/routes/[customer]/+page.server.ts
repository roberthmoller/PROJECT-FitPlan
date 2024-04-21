import { orders } from '$lib/server/database';
import { stripe } from '$lib/server/checkout';


export async function load({ cookies, params }) {
	const { customer } = params;
	if (cookies.get('CustomerId') !== customer) {
		cookies.set('CustomerId', customer, { path: '/' });

		return {
			customer: await stripe.customers.retrieve(customer),
			orders: await orders.findMany({ where: { customer } })
		};
	}

	return {
		orders: await orders.findMany({ where: { customer } })
	};
}

