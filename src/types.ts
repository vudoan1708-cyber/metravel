import type { LatLngTuple } from 'leaflet';
import type { Document } from 'mongoose';

export interface IJournalModel extends Document {
  place_id: string;
  latlng: LatLngTuple;
  popup: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JournalModelType = {
  place_id: string;
  latlng: LatLngTuple;
  popup: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GeocodingResultType = {
  place_id: string;
  lat: number;
  lon: number;
  formatted?: string;
}
