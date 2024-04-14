export function renderWorkout(data: string) {
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
	${data}
</body>
</html>
`;
}