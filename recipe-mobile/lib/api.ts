const { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_PORT } = process.env;
export const apiUrl = EXPO_PUBLIC_API_URL && EXPO_PUBLIC_API_PORT ? `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_API_PORT}` : "http://localhost:3000";

let authUserId: string | null =
  '00000000-0000-0000-0000-000000000001';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authUserId) {
    headers['x-user-id'] = authUserId;
  }
  return headers;
}

export async function fetchApi(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const url = `${apiUrl}${path}`;
  const headers = new Headers(init?.headers);
  for (const [key, value] of Object.entries(getAuthHeaders())) {
    if (!headers.has(key)) headers.set(key, value);
  }
  return fetch(url, { ...init, headers });
}
