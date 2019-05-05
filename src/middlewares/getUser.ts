import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../interfaces'

export function getUser(): any {
    return (req: ICustomRequest, res: Response, next: NextFunction) => {
        if (req.headers && req.headers.user && typeof req.headers.user == 'string') {
            req.userId = parseInt(req.headers.user, 10);
        }

        if (!req.userId) {
            return res.status(400).json({
                message: 'Missing `user` on header'
            });
        }

        return next();
    };
}
