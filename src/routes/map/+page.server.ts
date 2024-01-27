import { getAllJournals } from '$lib/utils/apiWrappers';

import type { JournalModelType } from '../../types';

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<{ journalEntry: Array<JournalModelType & { _id: string }> }> {
  // Fetch API to get all saved locations
	const response = await getAllJournals();

	return {
		journalEntry: response || [],
	};
}
