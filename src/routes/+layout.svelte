<script lang="ts">
	import '../styles/app.scss';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Stripe from 'stripe';
	import { Toaster } from 'svelte-sonner';

	export let data: { customer: Stripe.Customer | undefined };


	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });

	$: wasSuccess = $page.url.searchParams.has('success');
	$: wasCancelled = $page.url.searchParams.has('cancelled');
	$: path = $page.url.pathname.split('/').filter((x) => x);

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
					<h2><strong><a href="/" aria-current={path.length === 0}>FitPlan</a></strong></h2>
					<!--					<h2 style="text-align: right"><strong><a href="/">MealPlan</a></strong></h2>-->

					<p>Your personalized workout starts here</p>
				</hgroup>
			</li>
		</ul>
		<ul>
			<li>
				<hgroup class="right-align">
					{#if data.customer}
						<h4><a class="contrast" aria-current={path.length > 0} href="/{data.customer.id}">Orders</a>
						</h4>
						<p>{data.customer.email} (<a href="/logout" data-sveltekit-preload-data="off">logout</a>)</p>
					{:else}
						<h4>Orders</h4>
						<p><a href="/login">Login</a> to view your orders</p>
					{/if}
				</hgroup>
			</li>
		</ul>
	</nav>

	<slot />

	<footer>
		<!--		<small><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></small>-->
		<!--		<br />-->
		<small>© Robert Hjortsholm Moller</small>
	</footer>
</main>

<Toaster richColors theme="system" />


<style lang="scss">
  .right-align {
    text-align: right;
  }

  footer {
    text-align: center;
    padding: 10px;
    //position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>