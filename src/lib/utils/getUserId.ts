import type { User } from "@auth/sveltekit";

export const getUserId = (user?: User) => user?.id || user?.image?.split('/').slice(-1)[0] || '';
