import { stripe } from '$lib/server/checkout';

export async function load({ cookies }) {
	const customerId = cookies.get('CustomerId');
	if (!customerId) return {};
	return {
		customer: await stripe.customers.retrieve(customerId)
	};
}