import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://idea-vault-sooty.vercel.app",
  plugins: [jwtClient()],
});
