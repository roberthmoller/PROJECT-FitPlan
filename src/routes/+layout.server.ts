import { stripe } from '$lib/server/checkout';

export async function load({ cookies }) {
	try {
		const customerId = cookies.get('CustomerId');
		if (!customerId) return {};
		return {
			customer: await stripe.customers.retrieve(customerId)
		};
	} catch (error) {
		console.error(error);
		cookies.delete('CustomerId', { path: '/' });
		return {};
	}
}