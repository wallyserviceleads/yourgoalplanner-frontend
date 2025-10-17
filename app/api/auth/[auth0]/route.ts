import { NextRequest, NextResponse } from "next/server";
import { handleAuth } from "@auth0/nextjs-auth0";

const authHandler = handleAuth();

function resolveAuth0Secret() {
  if (process.env.AUTH0_SECRET && process.env.AUTH0_SECRET.length > 0) {
    return process.env.AUTH0_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    const fallbackSecret =
      process.env.AUTH0_CLIENT_SECRET || "development-yourgoalplanner-secret";

    process.env.AUTH0_SECRET = fallbackSecret;
    return fallbackSecret;
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
