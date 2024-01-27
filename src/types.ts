import type { LatLngTuple } from 'leaflet';
import type { Document } from 'mongoose';

export interface IJournalModel extends Document {
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
