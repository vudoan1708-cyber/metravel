import type { LatLngTuple } from 'leaflet';
import type { Document } from 'mongoose';

export interface IJournalModel extends Document {
  user_id: string;
  place_id: string;
  place_name: string;
  latlng: LatLngTuple;
  popup: {
    [key: string]: string
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type JournalModelType = {
  user_id: string;
  place_id: string;
  place_name: string;
  latlng: LatLngTuple;
  popup: {
    [key: string]: string
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type GeocodingResultType = {
  place_id: string;
  lat: number;
  lon: number;
  formatted?: string;
}
