import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export function isProduction() {
	return PUBLIC_ENVIRONMENT === 'prod';
}

export function isDevelopment() {
	return PUBLIC_ENVIRONMENT === 'dev';
}
