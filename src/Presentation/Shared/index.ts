import * as express from "express";
import {IFilter, IPaginator, ISort} from "../../InterfacesAdapters";

export abstract class Transformer
{
    abstract transform(data: any): any;
    handle(data: any): any
    {
        let result = null;

        if (data instanceof Array)
        {
            result = data.map((element: any) =>
            {
                return this.transform(element);
            });
        }
        else
        {
            result = this.transform(data);
        }

        return result;
    }
}


export abstract class Filter implements IFilter
{
    private readonly filters: Map<string, any>;

    constructor(request: express.Request)
    {
        this.filters = new Map<string, string>();
        let queryFilters: any = request.query.hasOwnProperty('filter') ? request.query.filter : [];
        let defaultFilters: any = this.getDefaultFilters();
        let keys = this.getFields();

        defaultFilters.forEach((defaultFilter: any) => {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });

        let newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: any = request.query.filter;

            return {
                [key]: filter[key]
            };
        }).filter((value => {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) => {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });
    }

    get(key: string): string
    {
        return this.filters.has(key) ? this.filters.get(key) : '';
    }

    getArray(): any
    {
        return this.filters.entries();
    }

    has(key: string): boolean
    {
        return this.filters.has(key);
    }

     isEmpty(): boolean
    {
        return this.filters.size === 0;
    }

    values(): Map<string, any>
    {
        return this.filters;
    }

    abstract getFields(): any[];
    abstract getDefaultFilters(): any;
}

export abstract class Sort implements ISort
{
    private readonly sorts: Map<string, string>;

    constructor(request: express.Request)
    {
        // TODO: Remove logic from constructor
        this.sorts = new Map<string, string>();
        let sorts: any = request.query.hasOwnProperty('sort') ? request.query.sort : [];
        let keys = this.getFields();

        let newSorts = Object.keys(sorts).map((key: string) =>
        {
            const sort: any = request.query.sort;

            return {
                [key]: sort[key]
            };
        }).filter((value => {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newSorts.forEach((newSort: any) => {
            const defaultKey: string = Object.keys(newSort)[0];
            const defaultValue: string = newSort[defaultKey];

            this.sorts.set(defaultKey, defaultValue);
        });

        let defaultSorts = this.getDefaultSorts();

        if (this.sorts.size === 0)
        {
            defaultSorts.forEach((defaultSort: any) =>
            {
                const defaultKey: string = Object.keys(defaultSort)[0];
                const defaultValue: string = defaultSort[defaultKey];

                this.sorts.set(defaultKey, defaultValue);
            });
        }
    }

    public get(): Map<string, string>
    {
        return this.sorts;
    }

    abstract getFields(): any;
    abstract getDefaultSorts(): any;
}

export class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator)
    {
        return {
            total: paginator.getTotal(),
            currentUrl: paginator.getCurrentUrl(),
            nextUrl: paginator.getNextUrl()
        };
    }
}
