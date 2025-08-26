// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Public routes don’t require auth
  publicRoutes: ["/", "/favicon.ico", "/_next(.*)"],
});

export const config = {
  // Protect dashboard + API routes
  matcher: ["/dashboard(.*)", "/api/(.*)"],
};
