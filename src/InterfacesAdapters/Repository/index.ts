import {ICriteria, IPaginator} from "../Criteria";

export interface IBaseRepository
{
    save(element: any): Promise<any>;
    update(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(id: any): Promise<any>;
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

export interface ITokenRepository
{
    save(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    update(element: any): Promise<any>
}
