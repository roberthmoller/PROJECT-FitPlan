import { NODE_ENV } from '$env/static/private';

export function isProduction() {
	return NODE_ENV === 'production';
}

export function isDevelopment() {
	return NODE_ENV === 'development';
}
