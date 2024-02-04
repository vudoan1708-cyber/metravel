import { redirect } from '@sveltejs/kit';

import { getAllJournals } from '$lib/utils/apiWrappers';

import type { JournalModelType } from '../../types';
import { getUserId } from '$lib/utils/getUserId';

/** @type {import('./$types').PageServerLoad} */
export async function load(event): Promise<{ journalEntry: Array<JournalModelType & { _id: string }> }> {
	const { session } = await event.parent();
	if (!session?.user) throw redirect(303, '/');

  // Fetch API to get all saved locations
	const response = await getAllJournals();
	const id = getUserId(session?.user);

	return {
		journalEntry: response.filter((r: JournalModelType) => r.user_id === id) || [],
	};
}
