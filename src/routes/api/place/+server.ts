import { journalDatabase } from '$lib/server/database.server.js';
import { json, error } from '@sveltejs/kit';
import type { JournalModelType } from '../../../types.js';

// /api/place POST
export const POST = async (event) => {
  const data = await event.request.json();
  console.log(data);
  try {
    await journalDatabase.create(data as unknown as JournalModelType);
  } catch (err: any) {
    error(404, err?.message);
  }

  return json({ success: true });
};
