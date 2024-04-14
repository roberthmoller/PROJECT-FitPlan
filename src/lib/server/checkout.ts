import Stripe from 'stripe';
import { SECRET_STRIPE_KEY, SECRET_STRIPE_WEBHOOK_KEY } from '$env/static/private';
import { type Cookies, redirect } from '@sveltejs/kit';
import { methodNotAllowed, unauthorised } from '$lib/server/utils/http';

export const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function charge(url: URL, email: string, metadata: { [key: string]: any }) {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{ price: 'price_1P56C9EpzTiLPnbs3Hwsu0wh', quantity: 1 }
		],
		// customer_email: email,
		mode: 'payment',
		allow_promotion_codes: true,
		success_url: `${url.protocol}//${url.host}?success`,
		cancel_url: `${url.protocol}//${url.host}?cancelled`,
		metadata: { email, ...metadata }
	});

	if (session.url) {
		redirect(303, session.url);
	}
}

export async function onComplete(request: Request) {
	const sig = request.headers.get('stripe-signature') ?? unauthorised();
	const payloadBuffer = await request.arrayBuffer();
	const payload = toBuffer(payloadBuffer);

	const event = tryCatch(() => stripe.webhooks.constructEvent(payload, sig, SECRET_STRIPE_WEBHOOK_KEY), unauthorised);
	if (event.type !== 'checkout.session.completed') methodNotAllowed();
	const transaction = event.data.object;
	const metadata = transaction.metadata;
	const customer = transaction.customer_details;
	return { metadata, customer };
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