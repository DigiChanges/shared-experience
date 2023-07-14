import { Transformer } from './Transformer';

export class DefaultTransformer extends Transformer
{
    public async transform(data: any)
    {
        return data;
    }
}
