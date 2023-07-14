import { ErrorException } from '../Errors';

export class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        const key = 'shared.exceptions.notFound';
        super({
            message: `${entity} not found.`,
            errorCode: key
        }, NotFoundException.name, { entity });
    }
}
