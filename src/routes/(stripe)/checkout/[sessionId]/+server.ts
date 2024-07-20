import { stripe } from '$lib/server/checkout';
import { redirect } from '@sveltejs/kit';


export async function GET({ params }) {
	const { sessionId } = params;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	redirect(302, `/${session.customer}`);
}