import nodemailer from 'nodemailer';
import { render } from 'svelte/server';
import WorkoutPlan from '$lib/workout-plan.svelte';

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

	const { html } = render(WorkoutPlan, { props: { content: workout } });

	const options = {
		from: 'you@example.com',
		to: 'robert@hjortsholm.com',
		subject: 'hello world',
		html: html
	};
	transporter.sendMail(options);
}