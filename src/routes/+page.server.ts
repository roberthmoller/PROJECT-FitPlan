import { type RequestEvent } from '@sveltejs/kit';
import { trainer, mailer, checkout } from '$lib/server';
import * as stripe from 'stripe';


export const actions = {
	default: async ({ request, cookies }) => {
		let {
			email,
			goal,
			details,
			level,
			gym, home, outside,
			honeypot
		} = await formData(request);
		if (honeypot) return;
		await checkout.charge(email.toString(), cookies, { goal, details, level, gym, home, outside });
	}
};

export async function load({ url, cookies, fetch }) {
	// const sessionId = cookies.get('session');
	// if (sessionId) {
	// 	const session = await checkout.stripe.checkout.sessions.retrieve(sessionId);
	// 	console.log('purchased with:', session.metadata);
	// 	if (session.payment_status === 'paid') {
	// 		fetch('/success', { method: 'POST', body: JSON.stringify(session.metadata) });
	// 	}
	// }

	// if (url.searchParams.has('success')) {
	// 	const workout = await trainer.planWorkouts(
	// 		goal.toString(), details.toString(), level.toString(),
	// 		Array.from(facilities(gym?.toString(), home?.toString(), outside?.toString()))
	// 	);
	// 	mailer.send(workout);
	// }
	return {};
}


async function formData(request: Request) {
	let data = await request.formData();
	console.log(JSON.stringify(Object.fromEntries(data.entries())));
	return Object.fromEntries(data.entries());
}

function* facilities(gym: string | undefined, home: string | undefined, outside: string | undefined) {
	if (gym) yield 'gym';
	if (home) yield 'home';
	if (outside) yield 'outside';
}