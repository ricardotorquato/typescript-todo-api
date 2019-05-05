import { Response } from 'express';
import { Controller, Delete, Get, Put, Post, Middleware } from '@overnightjs/core';

import { ICustomRequest, ITask } from '../interfaces';
import { getUser, validateBody } from '../middlewares';
import { TasksModel } from '../models';
import { tasksSchema } from '../schemas'

@Controller('tasks')
export class TasksController {

    @Get('')
    @Middleware([ getUser() ])
    async getAll(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;
        const items: ITask[] = await new TasksModel().findAllByUserId(userId);

        return res.status(200).json({ data: items });
    }

    @Get(':id')
    @Middleware([ getUser() ])
    async get(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const item: ITask = await new TasksModel().findOneByIdAndUserId(req.params.id, userId, ['user']);

        if (!item) {
            return res.status(404).json();
        }

        return res.status(200).json(item);
    }

    @Post('')
    @Middleware([ getUser(), validateBody(tasksSchema.create) ])
    async create(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;
        const task: ITask = await new TasksModel().store({ ...req.body, userId });

        return res.status(201).json(task);
    }

    @Put(':id')
    @Middleware([ getUser(), validateBody(tasksSchema.update) ])
    async update(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const idUpdated: number = await new TasksModel()
            .updateByIdAndUserId(req.params.id, userId, req.body);

        if (!idUpdated) {
            return res.status(404).json();
        }

        return res.status(204).json();
    }

    @Delete(':id')
    @Middleware([ getUser() ])
    async delete(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const deletedId: number = await new TasksModel().deleteByIdAndUserId(req.params.id, userId);

        if (!deletedId) {
            return res.status(404).json();
        }

        return res.status(204).json();
    }

    @Post(':id/markDone')
    @Middleware([ getUser() ])
    async markDone(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const updatedId: number = await new TasksModel().markDoneByIdAndUserId(req.params.id, userId);

        if (!updatedId) {
            return res.status(404).json();
        }

        return res.status(204).json();
    }
}
