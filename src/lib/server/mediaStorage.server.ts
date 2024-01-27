import { v2 as cloudinary } from 'cloudinary';

import { SECRET_CLOUDINARY_NAME, SECRET_CLOUDINARY_API_KEY, SECRET_CLOUDINARY_SECRET_KEY } from '$env/static/private';

class MediaStorage {
  constructor() {
    cloudinary.config({
      cloud_name: SECRET_CLOUDINARY_NAME, 
      api_key: SECRET_CLOUDINARY_API_KEY, 
      api_secret: SECRET_CLOUDINARY_SECRET_KEY,
      secure: true,
    });
  }

  public async search() {

  }

  public async upload(file: string, dateRange: string) {
    await cloudinary.uploader.upload(file, {
      async: true,
      folder: dateRange,
    });
  }
}

const mediaStorage = new MediaStorage();
export { mediaStorage };
