import nodemailer from 'nodemailer';
import WorkoutPlan from '$lib/server/workout-plan.svelte';
import { render } from 'svelte-email';

export function send(workout: string) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'katelynn.hamill@ethereal.email',
			pass: '9hTJ34VFzRsReeNfGg'
		}
	});

	const html = render({
		template: WorkoutPlan,
		props: { data: { content: workout } }
	});

	const options = {
		from: 'you@example.com',
		to: 'robert@hjortsholm.com',
		subject: 'hello world',
		html: html
	};
	transporter.sendMail(options);
}