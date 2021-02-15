
export interface IFilter
{
    values(): Map<string, any>;
    get(key: string): any;
    getArray(key: string): any[];
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): any[];
}

export interface ISort
{
    get(): Map<string, string>;
}

export interface IPagination
{
     getLimit(): number;
     getOffset(): number;
     getCurrentUrl(): string;
     getNextUrl(): string;
     getExist(): boolean;
}

export interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IFilter;
    getSort(): ISort;
}

export interface IPaginator
{
    paginate(): Promise<any>;
    getTotal(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}
