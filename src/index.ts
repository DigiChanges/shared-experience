
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
