import {IFilter, IPaginator, ISort} from "../../InterfacesAdapters";
import QueryString from 'qs';

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

    protected constructor(query: QueryString.ParsedQs)
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

    protected constructor(query: QueryString.ParsedQs)
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
            currentUrl: paginator.getCurrentUrl(),
            nextUrl: paginator.getNextUrl()
        };
    }
}
