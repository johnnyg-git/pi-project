import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/authStore';

export const load: LayoutServerLoad = async ({ cookies }) => {
	let authToken = cookies.get('authToken');

	console.log('User attempted to access admin panel with token:', authToken);

	if (!authToken) {
		console.log('User attempted to access admin panel without a token');
		throw redirect(302, '/');
	}

	// Verify the authToken here (e.g., check against a database or an auth service)
	let isValidToken = await verifyToken(authToken);

	if (!isValidToken) {
		if (cookies.get('authToken')) {
			cookies.delete('authToken', { path: '/' });
		}
		console.log('User attempted to access admin panel with an invalid token');
		throw redirect(302, '/');
	}

	console.log('User accessed admin panel with token:', authToken);

	return {};
};
