import { Request, Response, NextFunction } from 'express';
import { SchemaLike, validate, ValidationResult, ValidationOptions } from 'joi';

export function validateBody(schema: SchemaLike): any {
    return (req: Request, res: Response, next: NextFunction) => {
        const options: ValidationOptions = {
            allowUnknown: false,
            abortEarly: false
        };

        const result: ValidationResult<any> = validate(req.body, schema, options);

        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        return next();
    }
}
