import { error } from '@sveltejs/kit';

export const unauthorised = () => error(401);
export const methodNotAllowed = () => error(405);