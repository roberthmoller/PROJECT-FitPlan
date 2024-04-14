import { stripe } from '$lib/server/checkout';
import { SECRET_STRIPE_WEBHOOK_KEY } from '$env/static/private';
import { methodNotAllowed, unauthorised } from '$lib/server/utils/http';


async function extracted(request: Request) {
	const sig = request.headers.get('stripe-signature') ?? unauthorised();
	const payloadBuffer = await request.arrayBuffer();
	const payload = toBuffer(payloadBuffer);

	const event = tryCatch(() => stripe.webhooks.constructEvent(payload, sig, SECRET_STRIPE_WEBHOOK_KEY), unauthorised);
	console.log('type', event.type);
	if (event.type !== 'checkout.session.completed') methodNotAllowed();
	const session = event.data.object;
	console.log('checkout.session.completed', session);
	// return session.metadata;
}

export async function POST({ request }) {
	await extracted(request);
	return new Response('ok');
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