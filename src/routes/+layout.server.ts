import { stripe } from '$lib/server/checkout';


export async function load({ cookies }) {
	const customer = cookies.get('customer_id');
	return {
		customer: customer ? await stripe.customers.retrieve(customer) : undefined
	};
}