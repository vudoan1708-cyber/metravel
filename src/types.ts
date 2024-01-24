import type { LatLngBoundsExpression } from 'leaflet';
import type { Document } from 'mongoose';

export interface IJournalModel extends Document {
  latlng: LatLngBoundsExpression;
  popup: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JournalModelType = {
  latlng: LatLngBoundsExpression;
  popup: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
