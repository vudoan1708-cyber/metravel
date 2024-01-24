import { dev } from '$app/environment';

export const METRAVEL_BASEURL = dev ? 'http://localhost:5173' : '';
export const GEOAPIFY_BASEURL = 'https://api.geoapify.com/v1/geocode';
