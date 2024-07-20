import { dayjs } from 'svelte-time';

export function workoutTemplate(data: string, url: URL, customer: string, createdAt: Date): string {
	const homeLink = url.origin;
	const magicLink = url.origin + `/${customer}`;
	// language=MD
	return `
      # Your Personalized Workout Program

      [Home](${homeLink}) / [Order](${magicLink}) / ${dayjs(createdAt).format('DD/MM/YYYY @ HH:mm')}

      ${data}

      ---
      Remember to maintain proper form and technique throughout each exercise. If you are unsure about any exercise,
      consult a fitness professional or trainer. Make sure to increase your water intake and have a balanced diet with
      enough protein to support muscle growth. Have a great workout!

      You can <a href="https://www.muscleandstrength.com/exercises">see videos of the exercises here</a>.
      If you have any questions, <a href="mailto:robert@hjortsholm.com">please email me here</a>.

      Kind regards,

      Robert
	`;
}