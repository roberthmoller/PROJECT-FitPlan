import { orders } from '$lib/server/database';
import { Utf8 } from 'crypto-es/lib/core';


export async function load({ cookies, params, url, request }) {
	const { customer } = params;
	if (cookies.get('CustomerId') !== customer) {
		cookies.set('CustomerId', customer, { path: '/' });
	}

	return {
		orders: await orders.findMany({ where: { customer } })
	};
}

