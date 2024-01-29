import { r2 } from '$lib/server/cloudflareR2.server';
import { json, error } from '@sveltejs/kit';
import { uploadFile } from '$lib/utils/apiWrappers';

// api/file GET
export const GET = async (event) => {
  const name = event.url.searchParams.get('name');

  if (!name) {
    error(400, 'name is a required search parameter');
  }
  
  // Get presigned URL
  const response = await r2.getPresignedUrl(name, undefined, 'Get');
  if (!response) {
    error(500, 'Cannot get the presigned URL');
  }

  if (!response.presignedUrl) {
    error(404, 'The request file might not exist');
  }

  try {
    return json(response);
  } catch (err: any) {
    error(500, err?.message);
  }
};

// api/file POST
export const POST = async (event) => {
  const data = await event.request.formData();
  const [ filePath, file ] = data.values() as IterableIterator<string | File>;
  // Get presigned URL
  const response = await r2.getPresignedUrl(filePath as string, (file as File).type);
  if (!response) {
    error(500, 'Cannot get the presigned URL');
  }

  if (!response.presignedUrl) {
    error(404, 'The request file might not exist');
  }

  try {
    await uploadFile(response.presignedUrl, file as File);
    return json({ success: true });
  } catch (err: any) {
    error(500, err?.message);
  }
};
