import { Request, Response, NextFunction } from 'express';
import { Controller, Delete, Get, Put, Post } from '@overnightjs/core';

@Controller('tasks')
export class TasksController {

    @Get('')
    getAll(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

    @Get(':id')
    get(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

    @Post('')
    create(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

    @Put(':id/markDone')
    markDone(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

    @Put(':id')
    update(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

    @Delete(':id')
    delete(req: Request, res: Response): Response {
        return res.status(501).json({ message: 'Not implemented' });
    }

}
