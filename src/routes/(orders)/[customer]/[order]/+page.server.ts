import { plans } from '$lib/server/database';
import { compile } from 'mdsvex';
import { redirect } from '@sveltejs/kit';


export async function load({ cookies, params, url }) {
	const { customer, order } = params;

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