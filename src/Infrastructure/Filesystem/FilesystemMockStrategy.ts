import internal from 'stream';
import { IFilesystem } from './IFilesystem';
import { FileVersionPayload } from './FileVersionPayload';
import { ListObjectsPayload } from './ListObjectsPayload';

export class FilesystemMockStrategy implements IFilesystem
{
    private readonly filesystem: string;
    private readonly pathTemp: string;

    constructor()
    {
        this.pathTemp = '/tmp/';
        this.filesystem = 'filesystem';
    }

    async presignedGetObject(object: FileVersionPayload, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
    {
        return Promise.resolve('success');
    }

    async presignedPutObject(objectName: string, expiry: number): Promise<string>
    {
        return Promise.resolve('success');
    }

    async createBucket(bucketName: string, region?: string): Promise<void>
    {
        return Promise.resolve();
    }

    async setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>
    {
        return Promise.resolve();
    }

    async uploadFile(object: FileVersionPayload, path: string): Promise<string>
    {
        return Promise.resolve('success');
    }

    async uploadFileByBuffer(object: FileVersionPayload, base64Data: string)
    {
        return Promise.resolve('success');
    }

    async downloadFile(object: FileVersionPayload): Promise<string>
    {
        return Promise.resolve('success');
    }

    async downloadStreamFile(object: FileVersionPayload): Promise<internal.Readable>
    {
        return Promise.resolve(new internal.Readable());
    }

    async listObjects(payload: ListObjectsPayload)
    {
        return Promise.resolve('success');
    }

    async removeObjects(object: FileVersionPayload): Promise<void>
    {
        return Promise.resolve();
    }

    getClient(): any
    {
        return this.filesystem;
    }
}
