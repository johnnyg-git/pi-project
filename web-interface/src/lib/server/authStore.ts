let authTokens: Set<string> = new Set();

export async function verifyToken(token: string): Promise<boolean> {
	return authTokens.has(token);
}

export async function addToken(token: string): Promise<void> {
	authTokens.add(token);
}
