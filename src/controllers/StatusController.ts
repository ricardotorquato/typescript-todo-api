import { Request, Response, NextFunction } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('status')
export class StatusController {

    @Get('/')
    get(req: Request, res: Response): Response {
        return res.status(200).json({ message: 'Server is running' });
    }
}
