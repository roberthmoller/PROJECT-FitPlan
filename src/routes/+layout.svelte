<script lang="ts">
	import '../styles/app.scss';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });

	$: wasSuccess = $page.url.searchParams.has('success');
	$: wasCancelled = $page.url.searchParams.has('cancelled');


	onMount(() => {
		if (wasSuccess) setTimeout(() => wasSuccess = false, 5000);
		if (wasCancelled) setTimeout(() => wasCancelled = false, 5000);
	});
</script>


<main>
	<nav>
		<ul>
			<li>
				<hgroup>
					<h2><strong>FitPlan</strong></h2>
					<p>Your personalized workout starts here</p>
				</hgroup>
			</li>
		</ul>
		<!--		<ul>-->
		<!--			<li>-->
		<!--				<hgroup>-->
		<!--					<h2 style="text-align: right"><strong><a href="/">MealPlan</a></strong></h2>-->
		<!--					<p>Your personalized meals starts here</p>-->
		<!--				</hgroup>-->
		<!--			</li>-->
		<!--		</ul>-->
	</nav>

	<slot />

	{#if wasSuccess}
		<article id="toast" transition:slide="{{duration: 1000}}">
			✅ Purchase successful! Your plan is on its way to your inbox.
		</article>
	{:else if wasCancelled}
		<article id="toast" transition:slide="{{duration: 1000}}">
			❌ Purchase cancelled. No plan was sent.
		</article>
	{/if}

	<!--	        <footer>-->
	<!--	            <small><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></small>-->
	<!--	        </footer>-->
</main>

<style lang="scss">
  /*footer {*/
  /*    text-align: center;*/
  /*    padding: 10px;*/
  /*    position: fixed;*/
  /*    bottom: 0;*/
  /*    width: 100%;*/
  /*}*/
</style>