import koaQs from 'koa-qs';
import { Server } from 'http';

import Koa from 'koa';
import Router from 'koa-router';

import { IApp } from './IApp';
import { IAppConfig } from './IAppConfig';

export class AppKoa implements IApp
{
    public port?: number;
    #app: Koa;
    #server: Server | undefined;

    constructor(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        this.#app = koaQs(new Koa());
        this.#app.proxy = config.proxy;
    }

    public async addMiddleware<T>(middleware: T): Promise<void>
    {
        this.#app.use(middleware as Koa.Middleware);
    }

    public async addRouter<T>(router: T): Promise<void>
    {
        this.#app.use((router as Router).routes());
        this.#app.use((router as Router).allowedMethods());
    }

    public async listen(callback: () => void): Promise<void>
    {
        this.#server = this.#app.listen(this.port, callback);
    }

    public async getServer(): Promise<Server | undefined>
    {
        return this.#server;
    }

    public async callback(): Promise<any>
    {
        return this.#app.callback();
    }

    public async setNotFoundHandler<T>(router: any): Promise<void>
    {
        this.#app.use((router as Router).routes());
        this.#app.use((router as Router).allowedMethods());
    }

    public async setErrorHandler<T>(router: T, options?: unknown): Promise<void>
    {
        this.#app.use((router as Router).routes());
        this.#app.use((router as Router).allowedMethods());
    }

    public async close(): Promise<void>
    {
        if (this.#server)
        {
            this.#server.close();
        }
    }
}
