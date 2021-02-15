import stream from 'stream';
import {IStatusCode} from "../Presentation";

export interface IEncryption
{
    compare(chain: string, chainHashed: string): Promise<boolean>;
    decrypt(chain: string): Promise<string>;
    encrypt(chain: string): Promise<string>;
}

export interface IFilesystem
{
    listObjects(prefix?: string, recursive?: boolean ): Promise<any>;
    uploadFile(objectName: string, path: string): Promise<any>;
    uploadFileByBuffer(objectName: string, base64Data: string): Promise<any>;
    downloadFile(objectName: string): Promise<string>;
    downloadStreamFile(objectName: string): Promise<stream.Readable>;
    presignedGetObject(objectName: string, expiry?: number, respHeaders?: { [key: string]: any; }): Promise<string>;
    presignedPutObject(objectName: string, expiry?: number): Promise<string>;
    createBucket(bucketName: string, region?: string): Promise<void>;
    setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
    getClient(): any;
}

export interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode, metadata: any | null): any
}

export interface IHttpStatusCode
{
    code: number;
    statusCode: string;
    status: string;
}

export interface IMail
{
    getSenderName(): string;
    getFrom(): string;
    getTo(): string;
    getCC(): string;
    getSubject(): string;
    getHtml(): string;
    sendMail(): Promise<any>;
}
