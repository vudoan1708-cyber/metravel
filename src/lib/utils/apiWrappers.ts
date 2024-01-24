import axios from 'axios';

import { dev } from '$app/environment';
import { PUBLIC_GEOAPIFY_API_KEY } from '$env/static/public';

import { GEOAPIFY_BASEURL, METRAVEL_BASEURL } from './constants';

export const getFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  body: BodyInit | null = null,
) => {
  const options: RequestInit = {
    method,
    body,
  };
  if (method === 'GET') {
    delete options.body;
  }
  if (dev) {
    console.log(url, method);
  }

  try {
    const res = await axios[method.toLowerCase() as 'get' | 'post' | 'patch' | 'put' | 'delete'](url);
    return res;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const getGeocodingFromText = (search: string) => getFetch(`${GEOAPIFY_BASEURL}/search?text=${search}&format=json&apiKey=${PUBLIC_GEOAPIFY_API_KEY}`)
export const getAllJournals = () => getFetch(`${METRAVEL_BASEURL}/api/journals`);
