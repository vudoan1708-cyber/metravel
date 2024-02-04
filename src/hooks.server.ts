import { SvelteKitAuth } from '@auth/sveltekit';
import { SECRET_GOOGLE_CLIENT_ID, SECRET_GOOGLE_CLIENT_SECRET } from '$env/static/private';
import Google from '@auth/core/providers/google';

export const handle = SvelteKitAuth({
  providers: [
    Google({ clientId: SECRET_GOOGLE_CLIENT_ID, clientSecret: SECRET_GOOGLE_CLIENT_SECRET }),
  ],
  pages: {
    signIn: '/',
  },
});
