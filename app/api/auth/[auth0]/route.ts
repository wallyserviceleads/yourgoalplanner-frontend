import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { handleAuth } from "@auth0/nextjs-auth0";

const authHandler = handleAuth();

const MIN_SECRET_LENGTH = 32;

function rememberSecret(value: string) {
  process.env.AUTH0_SECRET = value;
  return value;
}

function deriveSecretFromClientSecret(clientSecret: string) {
  return createHash("sha256").update(clientSecret).digest("hex");
}

function resolveAuth0Secret() {
  const configuredSecret = process.env.AUTH0_SECRET?.trim();

  if (configuredSecret && configuredSecret.length >= MIN_SECRET_LENGTH) {
    return configuredSecret;
  }

  const clientSecret = process.env.AUTH0_CLIENT_SECRET?.trim();

  if (clientSecret && clientSecret.length > 0) {
    const derivedSecret = deriveSecretFromClientSecret(clientSecret);

    if (!configuredSecret) {
      console.warn(
        "AUTH0_SECRET is not configured. Deriving a secret from AUTH0_CLIENT_SECRET."
      );
    }

    return rememberSecret(derivedSecret);
  }

  if (process.env.NODE_ENV !== "production") {
    const fallbackSecret = "development-yourgoalplanner-secret";

    console.warn(
      "AUTH0_SECRET and AUTH0_CLIENT_SECRET are missing. Using a hard-coded development secret."
    );
    
    return rememberSecret(fallbackSecret);
  }
  
  }

  return undefined;
}

async function handler(
  request: NextRequest,
  context: { params: Promise<Record<string, string | string[]>> }
) {
  const secret = resolveAuth0Secret();

  if (!secret) {
    console.error("AUTH0_SECRET is not configured. Cannot complete Auth0 login.");
    return NextResponse.json(
      { error: "Auth0 secret is not configured on the server." },
      { status: 500 }
    );
  }

  const params = (await context.params) ?? {};

  return authHandler(request, { params });
}

export { handler as GET, handler as POST };
