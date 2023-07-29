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
        return new Promise<string>((resolve) => resolve('success'));
    }

    async presignedPutObject(objectName: string, expiry: number): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async createBucket(bucketName: string, region?: string): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    async setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    async uploadFile(object: FileVersionPayload, path: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async uploadFileByBuffer(object: FileVersionPayload, base64Data: string)
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadFile(object: FileVersionPayload): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadStreamFile(object: FileVersionPayload): Promise<internal.Readable>
    {
        return new Promise<internal.Readable>((resolve) => resolve(new internal.Readable()));
    }

    async listObjects(payload: ListObjectsPayload)
    {
        return new Promise((resolve) => resolve('success'));
    }

    async removeObjects(object: FileVersionPayload): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    getClient(): any
    {
        return this.filesystem;
    }
}
