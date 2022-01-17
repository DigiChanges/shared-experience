import {IFilter, IPaginator, ISort} from "../../InterfacesAdapters";
import {ParsedQs} from 'qs';

export abstract class Transformer
{
    abstract transform(data: any): any;
    handle(data: any): any
    {
        let result: any[] | any = [];

        if (typeof data[Symbol.iterator] === 'function')
        {
            for (const element of data)
            {
                result.push(this.transform(element));
            }
        }
        else
        {
            result = this.transform(data);
        }

        return result;
    }

    validate<T = any>(value: any, transformer: Transformer | null = null, returnNull = true): T | null | undefined
    {
        const valid = !!(value);

        if (transformer)
        {
            return valid ? transformer.handle(value) : (returnNull ? null : undefined);
        }

        return valid ? value : (returnNull ? null : undefined);
    }
}


export abstract class Filter implements IFilter
{
    private readonly filters: Map<string, any>;

    constructor(query: ParsedQs)
    {
        this.filters = new Map<string, any>();
        const queryFilters: any = query.filter ?? [];
        const defaultFilters: any = this.getDefaultFilters();
        const keys = this.getFields();

        defaultFilters.forEach((defaultFilter: any) =>
        {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });

        const newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: Record<string, any> = query.filter as Record<string, any>;

            return {
                [key]: filter[key]
            };
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) =>
        {
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

    abstract getFields(): string[];
    abstract getDefaultFilters(): any[];
}

export abstract class Sort implements ISort
{
    private readonly sorts: Map<string, string>;

    constructor(query: ParsedQs)
    {
        // TODO: Remove logic from constructor
        this.sorts = new Map<string, string>();
        const sorts: any = query.sort ?? [];
        const keys = this.getFields();

        const newSorts = Object.keys(sorts).map((key: string) =>
        {
            const sort: any = query.sort;

            return {
                [key]: sort[key]
            };
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newSorts.forEach((newSort: any) =>
        {
            const defaultKey: string = Object.keys(newSort)[0];
            const defaultValue: string = newSort[defaultKey];

            this.sorts.set(defaultKey, defaultValue);
        });

        const defaultSorts = this.getDefaultSorts();

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
            offset: paginator.getOffset(),
            limit: paginator.getLimit(),
            perPage: paginator.getPerPage(),
            currentPage: paginator.getCurrentPage(),
            lastPage: paginator.getLasPage(),
            from: paginator.getFrom(),
            to: paginator.getTo(),
            path: paginator.getPath(),
            firstUrl: paginator.getFirstUrl(),
            lastUrl: paginator.getLastUrl(),
            nextUrl: paginator.getNextUrl(),
            prevUrl: paginator.getPrevUrl(),
            currentUrl: paginator.getCurrentUrl()
        };
    }
}
