import {
  SECRET_R2_ACCOUNTID,
  SECRET_R2_ACCESS_KEY,
  SECRET_R2_SECRET_KEY,
  SECRET_S3_BUCKET_NAME,
} from '$env/static/private';
import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class R2Storage {
  private _s3: S3Client;

  constructor() {
    this._s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${SECRET_R2_ACCOUNTID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: SECRET_R2_ACCESS_KEY,
        secretAccessKey: SECRET_R2_SECRET_KEY,
      },
    });
  }

  // Reference: https://www.okupter.com/blog/upload-files-cloudflare-r2-in-sveltekit
  private _slugifyString(str: string) {
    return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/\./g, '-').replace(/-+/g, '-').replace(/[^a-z0-9-]/g, '-');
  }

  public async getPresignedUrl(fileName: string, fileType?: string, procedure: 'Get' | 'Put' = 'Put') {
    // This can be a file path
    const objectKey = fileName;
    const presignedUrl = await getSignedUrl(
      this._s3,
      procedure === 'Put'
      ? new PutObjectCommand({
        Bucket: SECRET_S3_BUCKET_NAME,
        Key: objectKey,
        ContentType: fileType,
        ACL: 'public-read'
      })
      : new GetObjectCommand({
        Bucket: SECRET_S3_BUCKET_NAME,
        Key: objectKey,
      }),
      {
        expiresIn: 60 * 5 // 5 minutes
      }
    );
    return { presignedUrl, objectKey };
  }
}

const r2 = new R2Storage();
export { r2 };
