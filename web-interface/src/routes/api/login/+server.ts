import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { PRIVATE_PASSWORD, PRIVATE_USERNAME } from '$env/static/private';
import { authTokens } from '$lib/server/authStore';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	try {
		const body = await request.json();
		const { username, password } = body;

		console.log('username:', username);
		console.log('password:', password);

		if (username !== PRIVATE_USERNAME || password !== PRIVATE_PASSWORD) {
			return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const token = Array(100)
			.fill(0)
			.map(() => Math.random().toString(36).charAt(2))
			.join('');
		cookies.set('authToken', token, { path: '/' });
		authTokens.add(token);

		console.log('locals.authTokens:', authTokens);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Failed to login:', error);

		return new Response(JSON.stringify({ error: 'Failed to login' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
