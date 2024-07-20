import Stripe from 'stripe';
import { SECRET_STRIPE_KEY, SECRET_STRIPE_WEBHOOK_KEY, SECRET_STRIPE_WORKOUT_PLAN_PRICE_ID } from '$env/static/private';
import { type Cookies, redirect } from '@sveltejs/kit';
import { methodNotAllowed, unauthorised } from '$lib/server/utils/http';
import { Exception } from 'sass';

export const stripe = new Stripe(SECRET_STRIPE_KEY);

export enum ProductStatus {
	CHECKOUT = 'checkout',
	PLANNING = 'planning',
	SHIPPING = 'shipping',
	DELIVERED = 'delivered'
}

export async function charge(url: URL, cookies: Cookies, metadata: { [key: string]: any }) {
	const customerId = cookies.get('CustomerId');
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{ price: SECRET_STRIPE_WORKOUT_PLAN_PRICE_ID, quantity: 1 }
		],
		// todo: Check cookies for encrypted customer id and use here if available
		customer: customerId,
		customer_creation: customerId ? undefined : 'always',
		mode: 'payment',
		allow_promotion_codes: true,
		success_url: `${url.protocol}//${url.host}/checkout/{CHECKOUT_SESSION_ID}`,
		cancel_url: `${url.protocol}//${url.host}?cancelled`,
		metadata
	});

	if (session.url) {
		redirect(303, session.url);
	}
}


export async function onComplete(request: Request): Promise<Stripe.Checkout.Session> {
	try {
		// Retrieve the Stripe signature header
		const sig = request.headers.get('stripe-signature');
		if (!sig) {
			console.error('Missing stripe-signature header');
			unauthorised();
		}

		// Retrieve and convert the payload
		const payloadBuffer = await request.arrayBuffer();
		const payload = toBuffer(payloadBuffer);

		// Construct the Stripe event
		let event: Stripe.Event;
		try {
			event = stripe.webhooks.constructEvent(payload, sig!, SECRET_STRIPE_WEBHOOK_KEY);
		} catch (err: any) {
			console.error('Error constructing Stripe event:', err.message);
			unauthorised();
		}

		// Check event type
		if (event!.type !== 'checkout.session.completed') {
			console.error(`Unexpected event type: ${event!.type}`);
			methodNotAllowed();
		}

		// Return the session object
		return event!.data.object as Stripe.Checkout.Session;
	} catch (error: any) {
		// Log the error and rethrow it
		console.error('Error handling webhook:', error.message);
		throw error;
	}
}


function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

function tryCatch<T>(f: () => T, handle: (err: unknown) => void): T {
	try {
		return f();
	} catch (err) {
		handle(err);
		throw err;
	}
}