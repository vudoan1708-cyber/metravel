import { json } from '@sveltejs/kit';

// /api/places GET
export const GET = async (event) => {
  const options: ResponseInit =  {
    status: 200,
  };

  return json({});
};
