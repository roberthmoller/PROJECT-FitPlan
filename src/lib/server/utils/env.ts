import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export function isProduction() {
	console.log('PUBLIC_ENVIRONMENT', PUBLIC_ENVIRONMENT);
	return PUBLIC_ENVIRONMENT === 'prod';
}

export function isDevelopment() {
	return PUBLIC_ENVIRONMENT === 'dev';
}
