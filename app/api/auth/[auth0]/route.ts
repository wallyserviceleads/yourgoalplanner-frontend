import { handleAuth } from "@auth0/nextjs-auth0";

/**
 * The handleAuth() function from the Auth0 Next.js SDK is designed to
 * automatically read all the necessary environment variables (like AUTH0_SECRET,
 * AUTH0_BASE_URL, etc.) when it initializes.
 *
 * By simplifying this file, we remove the complex and error-prone logic
 * that was attempting to set the secret at runtime, which was causing the 500 error.
 * The library will now correctly handle the configuration, provided the
 * environment variables are set in your Vercel project.
 *
 * This exports the GET and POST handlers for the /api/auth/[auth0] route.
 */
export const { GET, POST } = handleAuth();
