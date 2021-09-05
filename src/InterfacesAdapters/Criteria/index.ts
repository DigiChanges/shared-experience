
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
     getPath(): string;
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
    getPerPage(): number;
    getCurrentPage(): number;
    getLasPage(): number;
    getFrom(): number;
    getTo(): number;
    getPath(): string;
    getFirstUrl(): string;
    getLastUrl(): string;
    getNextUrl(): string;
    getPrevUrl(): string;
    getCurrentUrl(): string;
    getExist(): boolean;
    getMetadata(): Record<string, any>;
    getOffset(): number;
    getLimit(): number;
}
