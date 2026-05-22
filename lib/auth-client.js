import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //base url adding
  baseURL: "http://idea-vault-sooty.vercel.app",
  plugins: [jwtClient()],
});
