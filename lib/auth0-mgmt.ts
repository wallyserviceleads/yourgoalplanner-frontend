'use server';

type TokenResp = { access_token: string; token_type: string; expires_in: number };

export async function getMgmtAccessToken() {
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
  const body = {
    client_id: process.env.AUTH0_MGMT_CLIENT_ID,
    client_secret: process.env.AUTH0_MGMT_CLIENT_SECRET,
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: 'client_credentials',
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Auth0 mgmt token error: ${resp.status} ${text}`);
  }
  const json = (await resp.json()) as TokenResp;
  return json.access_token;
}

export async function patchUserAppMetadata(userId: string, appMetadata: Record<string, any>) {
  const token = await getMgmtAccessToken();
  const resp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ app_metadata: appMetadata }),
    cache: 'no-store',
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Auth0 patch error: ${resp.status} ${text}`);
  }
  return await resp.json();
}

export async function getUser(userId: string) {
  const token = await getMgmtAccessToken();
  const resp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${encodeURIComponent(userId)}`, {
    headers: { 'authorization': `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Auth0 get user error: ${resp.status} ${text}`);
  }
  return await resp.json();
}
