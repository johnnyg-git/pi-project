import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { PRIVATE_PASSWORD, PRIVATE_USERNAME } from '$env/static/private';
import { addToken } from '$lib/server/authStore';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	try {
		let body = await request.json();
		let { username, password } = body;

		console.log('Attempting to login with username:', username, 'and password:', password);

		if (username !== PRIVATE_USERNAME || password !== PRIVATE_PASSWORD) {
			throw new Error('Invalid username or password');
		}

		const array = new Uint32Array(50);
		crypto.getRandomValues(array);
		const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
		const token = Array.from(array, (dec) => {
			const char = ('0' + dec.toString(36)).slice(-2);
			return Math.random() > 0.8
				? specialChars[Math.floor(Math.random() * specialChars.length)]
				: char;
		})
			.join('')
			.substring(0, 100);
		await addToken(token);
		cookies.set('authToken', token, { path: '/' });
		console.log('User logged in with token:', token);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Failed to login');

		return new Response(JSON.stringify({ error: 'Failed to login' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
