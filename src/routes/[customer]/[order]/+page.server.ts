import { plans } from '$lib/server/database';
import { compile } from 'mdsvex';
import { redirect } from '@sveltejs/kit';


export async function load({ cookies, params, url }) {
	const { customer, order } = params;
	// todo: Decrypt customer id and order

	if (cookies.get('customer_id') !== customer) {
		// todo: Encrypt customer id
		cookies.set('customer_id', customer, { path: '/' });
	}

	const savedPlan = await plans.findFirst({ where: { customer, id: order } });
	if (!savedPlan) redirect(303, `/${customer}`);

	const compiledPlan = await compile(savedPlan.content);

	return {
		plan: {
			...savedPlan,
			content: compiledPlan?.code
		}
	};
}