import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	cookies.delete('CustomerId', { path: '/' });
	console.log('Logged out', url.origin)
	return redirect(300, url.origin);
}