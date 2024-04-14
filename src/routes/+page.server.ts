import { checkout } from '$lib/server';


export const actions = {
	default: async ({ request, url }) => {
		let {
			email,
			goal,
			details,
			level,
			gym, home, outside,
			honeypot
		} = await formData(request);
		if (honeypot) return;
		await checkout.charge(url, email.toString(), { goal, details, level, gym, home, outside });
	}
};


async function formData(request: Request) {
	let data = await request.formData();
	console.log(JSON.stringify(Object.fromEntries(data.entries())));
	return Object.fromEntries(data.entries());
}

