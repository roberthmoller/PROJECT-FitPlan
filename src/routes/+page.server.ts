import { checkout } from '$lib/server';


export const actions = {
	default: async ({ request, url, cookies }) => {
		let {
			goal,
			details,
			level,
			gym, home, outside,
			honeypot
		} = await formData(request);
		if (honeypot) return;
		await checkout.charge(url, cookies, { goal, details, level, gym, home, outside });
	}
};

async function formData(request: Request) {
	let data = await request.formData();
	console.log(JSON.stringify(Object.fromEntries(data.entries())));
	return Object.fromEntries(data.entries());
}

