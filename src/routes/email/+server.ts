import { stripe } from '$lib/server/checkout';
import { error, redirect } from '@sveltejs/kit';


export async function GET({ url }) {
	const email = url.searchParams.get("email") ?? error(400);
	const session = await stripe.customers.list({
		email,
	});
	return new Response(JSON.stringify(session), {
		headers: {
			'Content-type': 'application/json'
		}
	});
}