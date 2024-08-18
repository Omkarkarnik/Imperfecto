import { ClerkProvider, RedirectToSignIn, useAuth } from '@clerk/nextjs';

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const clerkApiKey = process.env.CLERK_API_KEY;

export const clerkConfig = {
  apiKey: clerkApiKey,
  frontendApi: clerkFrontendApi,
};
