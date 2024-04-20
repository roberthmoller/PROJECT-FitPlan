<script lang="ts">
	import Stripe from 'stripe';
	import type { Plan } from '$lib/server/database';

	export let data: { plan: Plan, customer: Stripe.Customer };
</script>


{#if data.customer}
	<nav aria-label="breadcrumb">
		<ul>
			<li><a href="/{data.customer.id}">All orders</a></li>
			<li><span>workout</span></li>
		</ul>
	</nav>
{/if}

<article>
	<header>
		<h2>Your personalised workout plan</h2>
	</header>
	{@html data.plan?.content}
</article>
