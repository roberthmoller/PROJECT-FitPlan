export function renderWorkout(data: string) {
	// language=HTML
	return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="icon" href="%sveltekit.assets%/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.amber.min.css">
	<title>Personalized Workout Program</title>
	<style>
      body, html {
          height: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
      }
	</style>
</head>
<body data-sveltekit-preload-data="hover" class="container">
	<br/>
	<h1>Your Personalized Workout Program</h1>
	
	${data}

	<hr />
	<p>
		Remember to maintain proper form and technique throughout each exercise. If you are unsure about any exercise,
		consult a fitness professional or trainer. Make sure to increase your water intake and have a balanced diet with
		enough protein to support muscle growth. Have a great workout!
	</p>
	<p>
		You can <a href="https://www.muscleandstrength.com/exercises">see videos of the exercises here</a>.
		If you have any questions, <a href="mailto:robert@hjortsholm.com">please email me here</a>.
	</p>
	<footer>
		<p>Kind regards,</p>
		<p>Robert</p>
	</footer>
</body>
</html>
`;
}