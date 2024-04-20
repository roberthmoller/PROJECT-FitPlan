import { type Order, orders } from '$lib/server/database';

export async function POST({ request }) {
	const { id } = await request.json();
	console.log('🔄\tRefreshing order', id);
	if (!id) {
		const notGenerated = { wasGenerated: false } as Partial<Order>;
		return new Response(JSON.stringify(notGenerated), { status: 200 });
	}
	const order = await orders.findFirst({ where: { id } });
	return new Response(JSON.stringify(order), { status: 200 });
}


