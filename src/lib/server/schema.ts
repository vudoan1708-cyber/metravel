import { Schema } from 'mongoose';
import type { IJournalModel } from '../../types';

export const JournalSchema = new Schema<IJournalModel>({
  latlng: { type: Array, required: true },
  popup: String,
});
