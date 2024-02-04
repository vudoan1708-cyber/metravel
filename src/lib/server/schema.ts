import { Schema } from 'mongoose';
import type { IJournalModel } from '../../types';

export const JournalSchema = new Schema<IJournalModel>({
  user_id: { type: String, required: true },
  place_id: { type: String, required: true },
  place_name: { type: String, required: true },
  latlng: { type: Array<number>, required: true },
  popup: { type: Object, required: true },
  createdAt: Date,
  updatedAt: Date,
});
