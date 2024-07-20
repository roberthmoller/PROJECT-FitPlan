import { workoutTemplate } from '$lib/server/mails/workout-plan';
import { compile } from 'mdsvex';
import { ServerClient } from 'postmark';
import { SECRET_POSTMARK_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import { isProduction } from '$lib/server/utils/env';

const subject = 'Your personalised workout plan';
const sender = '"Robert from FitPlan" <robert@hjortsholm.com>';

export async function sendWorkout(workout: string, recipient: string, customer: string, url: URL, createdAt: Date): Promise<boolean> {
	const email = await compile(workoutTemplate(workout, url, customer, createdAt));
	if (isProduction()) {
		const postmark = new ServerClient(SECRET_POSTMARK_KEY);
		const response = await postmark.sendEmail({
			From: sender,
			// From: '"Robert from FitPlan" <robert@fitplan.com>',
			To: recipient,
			Subject: subject,
			HtmlBody: email?.code
		});
		return response.ErrorCode === 0;
	} else {
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: 'katelynn.hamill@ethereal.email',
				pass: '9hTJ34VFzRsReeNfGg'
			}
		});
		const options = {
			from: sender,
			to: recipient,
			subject: subject,
			html: email?.code
		};
		const response = await transporter.sendMail(options);
		return response.accepted.length > 0;
	}
}

export async function sendMagicLink(email: string, link: string): Promise<boolean> {
	const markdown = `
	# Magic link
	You requested a magic link to login. Click [here](${link}) to login.
	
	---
	
	**Note**: Once you click the link, you will be logged in automatically.
	`;
	const html = (await compile(markdown))?.code;

	if (isProduction()) {
		const postmark = new ServerClient(SECRET_POSTMARK_KEY);
		const response = await postmark.sendEmail({
			From: sender,
			To: email,
			Subject: 'Magic link',
			HtmlBody: html
		});
		return response.ErrorCode === 0;
	} else {
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: 'katelynn.hamill@ethereal.email',
				pass: '9hTJ34VFzRsReeNfGg'
			}
		});
		const options = {
			from: sender,
			to: email,
			subject: 'Magic link to login',
			html: html
		};
		const response = await transporter.sendMail(options);
		return response.accepted.length > 0;
	}
}
