import { mediaStorage } from '$lib/server/mediaStorage.server.js';
import { json, error } from '@sveltejs/kit';

// /api/media POST
export const POST = async (event) => {
  const data = await event.request.formData();
  Array.from(data.entries()).forEach(([ key, value ]) => {
    console.log(key, value);
  });
  try {
    // await mediaStorage.upload();
  } catch (err: any) {
    error(500, err?.message);
  }

  return json({ success: true });
};