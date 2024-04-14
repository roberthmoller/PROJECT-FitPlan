import { renderWorkout } from '$lib/server/mails/workout-plan';
import { compile } from 'mdsvex';
import { ServerClient } from 'postmark';
import { SECRET_POSTMARK_KEY } from '$env/static/private';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import nodemailer from 'nodemailer';

const subject = 'Your personalised workout plan';
const sender = '"Robert from FitPlan" <robert@hjortsholm.com>';

export async function send(workout: string, recipient: string) {
	const markdown = await compile(workout);
	const html = renderWorkout(markdown?.code ?? '');

	if (PUBLIC_ENVIRONMENT === 'prod') {
		const postmark = new ServerClient(SECRET_POSTMARK_KEY);
		await postmark.sendEmail({
			From: sender,
			// From: '"Robert from FitPlan" <robert@fitplan.com>',
			To: recipient,
			Subject: subject,
			HtmlBody: html
		});
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
			html: html
		};
		await transporter.sendMail(options);
	}
}