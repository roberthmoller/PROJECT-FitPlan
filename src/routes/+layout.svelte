<script lang="ts">
	import '../styles/app.scss';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Stripe from 'stripe';

	export let data: { customer: Stripe.Customer | undefined };
	import { Toaster } from 'svelte-sonner';


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
				<hgroup>
					{#if data.customer}
						<h4 style="text-align: right"><a class="contrast" aria-current={path.length > 0} href="/{data.customer.id}">Orders</a>
						</h4>
						<p>{data.customer.email}</p>
					{:else}
						<h4 style="text-align: right">Orders</h4>
						<p><a href="/login">Login</a> to view your orders</p>
						<!--TODO: Add "login" flow-->
					{/if}
				</hgroup>
			</li>
		</ul>
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

<Toaster richColors theme="system" />


<style lang="scss">
  /*footer {*/
  /*    text-align: center;*/
  /*    padding: 10px;*/
  /*    position: fixed;*/
  /*    bottom: 0;*/
  /*    width: 100%;*/
  /*}*/
</style>