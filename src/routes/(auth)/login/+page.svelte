<!--Todo: Get email-->
<!--Todo: Send login link to email-->
<script lang="ts">
	export let form: { status: 'success' | 'error', message: string, email?: string } | undefined;

	const second = 1_000;
	const timeout = 30 * second;

	$: waitForLink = form?.status === 'success';
	$: timeSent = form ? new Date(Date.now()) : undefined;
	let timeSinceSent = timeout / second;


	function tick() {
		if (!timeSent) return;
		timeSinceSent = Math.floor((timeout - (Date.now() - timeSent.getTime())) / second);
	}

	function resetForm(interval: NodeJS.Timeout): void {
		form = undefined;
		clearInterval(interval);
	}


	$: if (waitForLink) {
		const ticker = setInterval(tick, second);
		setTimeout(() => resetForm(ticker), timeout);
	}
</script>

<nav aria-label="breadcrumb">
	<ul class="breadcrumb">
		<li><a href="/">Home</a></li>
		<li>Login</li>
	</ul>
</nav>

<article>
	<header>
		<hgroup>
			<h2>Login</h2>
			<p>Enter the email address you used for your purchase and I'll send you a link to login</p>
		</hgroup>
	</header>

	<form action="/login" method="post">
		<fieldset role="group">
			{#if waitForLink}
				<input type="email" id="email" name="email" placeholder="Enter your email" value={form?.email} disabled
							 readonly>
				<button type="submit" aria-busy=true disabled>Resend in {timeSinceSent} seconds</button>
			{:else}
				<input type="email" id="email" name="email" placeholder="Enter your email" required>
				<input type="submit" value="Send Login Link" />
			{/if}
		</fieldset>
	</form>
</article>

{#if form}
	<footer>
		<input readonly aria-invalid={form.status === 'error'} value={form.message} />
	</footer>
{/if}
