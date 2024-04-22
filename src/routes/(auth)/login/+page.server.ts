import { stripe } from '$lib/server/checkout';
import { error } from '@sveltejs/kit';
import { mailer } from '$lib/server';

export const actions = {
	default: async ({ request }) => {
		try {
			const form = await request.formData();
			const email = form.get('email')?.toString() ?? error(400, 'Missing email');
			const customers = await stripe.customers.list({ email, limit: 1 });
			const customer = customers.data.length === 1
				? customers.data[0]
				: await stripe.customers.create({ email });
			const homePage = request.url.split('/').slice(0, -1).join('/');
			const magicLink = `${homePage}/${(customer.id)}`;
			const wasSent = await mailer.sendMagicLink(email, magicLink);
			if (!wasSent) throw new Error('Mail not sent.');
			return {
				email,
				status: 'success',
				message: 'Magic link sent. Please check your email.'
			};
		} catch (error) {
			console.error(error);
			return {
				status: 'error',
				error: 'An error occurred. Please try again.'
			};
		}
	}
};