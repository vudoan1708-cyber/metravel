import { writable, type Writable } from 'svelte/store';
import type { JournalModelType } from '../types';

export const journalEntry: Writable<Partial<JournalModelType>> = writable();
