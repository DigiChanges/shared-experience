import { Readable } from 'stream';
import { ListObjectsPayload } from './ListObjectsPayload';
import { FileVersionPayload } from './FileVersionPayload';

export interface IFilesystem
{
    listObjects(payload: ListObjectsPayload): Promise<any>;
    uploadFile(object: FileVersionPayload, path: string): Promise<any>;
    uploadFileByBuffer(object: FileVersionPayload, base64Data: string): Promise<any>;
    downloadFile(object: FileVersionPayload): Promise<string>;
    downloadStreamFile(object: FileVersionPayload): Promise<Readable>;
    presignedGetObject(object: FileVersionPayload, expiry?: number, respHeaders?: {
        [key: string]: any;
    }): Promise<string>;
    presignedPutObject(objectPath: string, expiry?: number): Promise<string>;
    createBucket(bucketName: string, region?: string): Promise<void>;
    removeObjects(object: FileVersionPayload): Promise<void>;
    setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
}
