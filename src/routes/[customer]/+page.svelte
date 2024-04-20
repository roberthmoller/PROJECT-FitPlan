<script lang="ts">
	import type { Order } from '@prisma/client';
	import { Stripe } from 'stripe';
	import Time from 'svelte-time';
	import { toast } from 'svelte-sonner';

	export let data: { orders: Order[], customer: Stripe.Customer };

	function formatGoal(goal: string) {
		switch (goal) {
			case 'muscle-gain':
				return '🏋️ Muscle gain';
			case 'weight-loss':
				return '📉 Weight loss';
			case 'flexibility':
				return '🙆 Flexibility';
			case 'endurance':
				return '🏃 Endurance';
			default:
				return '❓';
		}
	}

	function formatLevel(level: string) {
		switch (level) {
			case 'beginner':
				return '💪 Beginner';
			case 'intermediate':
				return '🦾 Intermediate';
			case 'advanced':
				return '🏆 Advanced';
			default:
				return '❓';
		}
	}

	function formatFacilities(facilities: string[]) {
		function formatFacility(facility: string) {
			switch (facility) {
				case 'gym':
					return '🏋️ Gym';
				case 'home':
					return '🏠 Home';
				case 'outside':
					return '🌳 Outside';
				default:
					return '❓';
			}
		}

		return facilities.map(formatFacility).join(' ');
	}

	async function refresh(order: Order) {
		try {
			const response = await fetch(`?/refresh`, {
				method: 'POST',
				body: JSON.stringify(order)
			});
			const { wasGenerated } = await response.json();
			data.orders = data.orders.map(o => {
				if (o.id === order.id) {
					return { ...o, wasGenerated };
				}
				return o;
			});

			if (wasGenerated) toast.success('Order was updated', { description: 'Successfully refreshed' });
			else toast.loading('Still working on it', { description: 'Check back in a minute.' });
		} catch (error) {
			toast.error('Failed to refresh order');
		}
	}
</script>

<header>
	<h3>All orders</h3>
</header>

<main>
	<table>
		<thead>
		<tr>
			<th scope="col">Level</th>
			<th scope="col">Goal</th>
			<th scope="col">Facilities</th>
			<th scope="col">Created</th>
			<th scope="col" />
		</tr>
		</thead>
		{#each data.orders as order}
			<tr>
				<td>{formatLevel(order.level)}</td>
				<td>{formatGoal(order.goal)}</td>
				<td>{formatFacilities(order.facilities)}</td>
				{#if order.wasGenerated}
					<td>
						<Time timestamp={order.createdAt} relative />
					</td>

					<td>
						<a href="/{data.customer.id}/{order.id}">View</a>
					</td>
				{:else}
					<td aria-busy="true">working on it</td>
					<td>
						<a href="/{data.customer.id}" on:click={() => refresh(order)}>Refresh</a>
					</td>
				{/if}
			</tr>
		{/each}
	</table>
</main>