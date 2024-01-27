import axios from 'axios';

import { dev } from '$app/environment';
import { PUBLIC_GEOAPIFY_API_KEY } from '$env/static/public';

import { GEOAPIFY_BASEURL, METRAVEL_BASEURL } from './constants';
import type { JournalModelType } from '../../types';

export const getFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  body: any = null,
) => {
  if (dev) {
    console.log(url, method);
  }

  try {
    const res = method === 'GET'
      ? await axios.get(url)
      : await axios[method.toLowerCase() as 'post' | 'patch' | 'put' | 'delete'](url, body);
    if (res.status === 204) return;
    if (res.status >= 400) throw (res);
    return res.data || res;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response?.data?.message || err?.message);
  }
};

export const getGeocodingFromText = (search: string) => getFetch(`${GEOAPIFY_BASEURL}/search?text=${search}&format=json&apiKey=${PUBLIC_GEOAPIFY_API_KEY}`)
export const getAllJournals = () => getFetch(`${METRAVEL_BASEURL}/api/journals`);
export const createJournal = (payload: JournalModelType) => getFetch(`${METRAVEL_BASEURL}/api/journal`, 'POST', payload);
export const updateJournal = (payload: Partial<JournalModelType> & { _id: string }) => (
  getFetch(`${METRAVEL_BASEURL}/api/journal`, 'PATCH', payload)
);
