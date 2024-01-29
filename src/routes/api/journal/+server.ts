import { journalDatabase } from '$lib/server/database.server.js';
import { json, error } from '@sveltejs/kit';
import type { JournalModelType } from '../../../types.js';

// /api/journal POST
export const POST = async (event) => {
  const data = await event.request.json();
  // Find the potential duplicate
  const item = await journalDatabase.findByPlaceId(data.place_id);
  if (item) {
    error(404, 'Cannot create because the place has been logged in the database. Maybe an update operation is what you need?');
  }

  try {
    await journalDatabase.create(data as unknown as JournalModelType);
    return json({ success: true });
} catch (err: any) {
    error(500, err?.message);
  }
};

// api/journal PATCH
export const PATCH = async (event) => {
  const data = await event.request.json();
  const { _id, ...rest } = data;
  try {
    await journalDatabase.update(_id, rest as unknown as Partial<JournalModelType>);
    return json({ success: true });
  } catch (err: any) {
    error(500, err?.message);
  }
};
