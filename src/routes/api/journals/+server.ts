import { journalDatabase } from '$lib/server/database.server.js';
import { json, error } from '@sveltejs/kit';

// /api/journals GET
export const GET = async () => {
  let all = [];

  try {
    all = await journalDatabase.findAll() || [];
  } catch (err: any) {
    error(500, err?.message);
  }

  return json(all);
};
