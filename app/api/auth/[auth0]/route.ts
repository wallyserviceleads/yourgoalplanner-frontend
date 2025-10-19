import { handleAuth } from "@auth0/nextjs-auth0";

/**
 * The handleAuth() function from the Auth0 Next.js SDK is designed to
 * automatically read all the necessary environment variables (like AUTH0_SECRET,
 * AUTH0_BASE_URL, etc.) when it initializes.
 *
 * This file creates a single handler from the SDK and exports it to handle
 * both GET and POST requests for all Auth0 routes (e.g., /login, /logout, /callback).
 * This corrected export syntax resolves the "405 Method Not Allowed" error.
 */
const handler = handleAuth();

export { handler as GET, handler as POST };
