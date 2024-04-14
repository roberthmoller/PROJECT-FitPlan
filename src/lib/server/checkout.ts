import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { type Cookies, redirect } from '@sveltejs/kit';

export const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function charge(email: string, cookies: Cookies, metadata: { [key: string]: any }) {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{ price: 'price_1P56C9EpzTiLPnbs3Hwsu0wh', quantity: 1 }
		],
		customer_email: email,
		mode: 'payment',
		allow_promotion_codes: true,
		success_url: `http://localhost:5173?success`,
		cancel_url: `http://localhost:5173?cancelled`,
		metadata: { email, ...metadata }
	});

	cookies.set('session', session.id, { path: '/' });

	if (session.url) {
		redirect(303, session.url);
	}
}
