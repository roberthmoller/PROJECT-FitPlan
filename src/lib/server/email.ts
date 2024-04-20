import { renderWorkout } from '$lib/server/mails/workout-plan';
import { compile } from 'mdsvex';
import { ServerClient } from 'postmark';
import { SECRET_POSTMARK_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import { isProduction } from '$lib/server/utils/env';

const subject = 'Your personalised workout plan';
const sender = '"Robert from FitPlan" <robert@hjortsholm.com>';

export async function send(workout: string, recipient: string): Promise<boolean> {


	if (isProduction()) {
		const postmark = new ServerClient(SECRET_POSTMARK_KEY);
		const response = await postmark.sendEmail({
			From: sender,
			// From: '"Robert from FitPlan" <robert@fitplan.com>',
			To: recipient,
			Subject: subject,
			HtmlBody: workout
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
			html: workout
		};
		const response = await transporter.sendMail(options);
		return response.accepted.length > 0;
	}
}