<script lang="ts">
	import Stripe from 'stripe';
	import type { Plan } from '$lib/server/database';
	import Time from 'svelte-time';

	export let data: { plan: Plan, customer: Stripe.Customer };
</script>


<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/{data.customer.id}">Orders</a></li>
		<li><Time timestamp={data.plan.createdAt} format="DD/MM/YYYY @ HH:ss"/></li>
	</ul>
</nav>

<article>
	<header>
		<h2>Your personalised workout plan</h2>
	</header>
	{@html data.plan?.content}
</article>
