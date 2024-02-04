import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const { session } = await event.parent();
  if (session?.user) {
    redirect(303, 'http://localhost:5173/map');
  }
}
