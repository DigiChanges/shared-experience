import { ErrorHttpException } from './ErrorHttpException';
import { StatusCode } from '../../Presentation';

export class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        const { statusCode, message, errors, metadata, errorCode } = errorHttpException;

        return {
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errorCode,
            errors,
            metadata
        };
    };
}
