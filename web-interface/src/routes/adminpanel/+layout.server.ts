import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { authTokens } from '$lib/server/authStore';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const authToken = cookies.get('authToken');

	console.log('authToken:', authToken);

	if (!authToken) {
		throw redirect(302, '/');
	}

	console.log('authToken:', authToken);
	console.log('locals.authTokens:', authTokens);

	// Verify the authToken here (e.g., check against a database or an auth service)
	const isValidToken = authTokens.has(authToken);

	if (!isValidToken) {
		if (cookies.get('authToken')) {
			cookies.delete('authToken', { path: '/' });
		}
		throw redirect(302, '/');
	}

	return {};
};
