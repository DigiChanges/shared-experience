import { Base } from '../../Domain';
import { Transformer } from './Transformer';
import { IDefaultMessageTransformer } from './IDefaultMessageTransformer';
import { ResponseMessageEnum } from '../Enum';

export class DefaultMessageTransformer<T extends Base> extends Transformer<T, IDefaultMessageTransformer>
{
    readonly #typeResponse: string;

    constructor(response: ResponseMessageEnum)
    {
        super();
        this.#typeResponse = response;
    }

    public async transform(data: T): Promise<IDefaultMessageTransformer>
    {
        return {
            id: data?._id,
            message: this.#typeResponse
        };
    }
}
