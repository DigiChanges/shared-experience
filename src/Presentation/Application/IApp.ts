import { Server } from 'http';

export interface IApp
{
    addMiddleware<T>(middleware: T): void;
    addRouter<T>(router: T): void
    callback(): unknown;
    close(): void;
    listen(callback: () => void): Server;
}
