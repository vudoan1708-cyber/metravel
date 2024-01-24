import { journalDatabase } from '$lib/server/database.server.js';
import { json, error } from '@sveltejs/kit';

// /api/places GET
export const GET = async () => {
  let all = [];

  try {
    all = await journalDatabase.findAll() || [];
  } catch (err: any) {
    error(404, err?.message);
  }

  return json(all);
};
