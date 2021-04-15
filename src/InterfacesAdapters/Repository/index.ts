import {ICriteria, IPaginator} from "../Criteria";

export interface IBaseRepository<T>
{
    save(element: T): Promise<T>;
    update(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(id: string): Promise<T>;
}

export interface ICacheRepository
{
    createConnection(config: any): any;
    set(key: string, value: string, expires?: number | null): Promise<any>;
    jset(key: string, value: any, expires?: number | null): Promise<any>;
    jget(key: string): Promise<any>
    get(key: any): Promise<string | number>;
    hset(key: string, value: {}): Promise<any>;
    hget(key: string, field: string | null): Promise<{}>;
    cleanAll(): Promise<any>;
}

export interface ITokenRepository<T>
{
    save(element: any): Promise<T>;
    getOne(id: string): Promise<T>;
    update(element: any): Promise<T>
}
