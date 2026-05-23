import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //base url adding
  baseURL: "https://idea-vault-sooty.vercel.app",
  // baseURL: "http://localhost:3000",

  plugins: [jwtClient()],
});
