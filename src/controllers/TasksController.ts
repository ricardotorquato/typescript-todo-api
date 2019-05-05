import { Collection } from 'bookshelf';
import { Response } from 'express';
import { Controller, Delete, Get, Put, Post, Middleware } from '@overnightjs/core';

import { ICustomRequest } from '../interfaces';
import { getUser, validateBody } from '../middlewares';
import { TasksModel } from '../models';
import { tasksSchema } from '../schemas'

@Controller('tasks')
export class TasksController {

    @Get('')
    @Middleware([ getUser() ])
    async getAll(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const items: TasksModel[] = await new TasksModel()
            .where('user_id', userId)
            .fetchAll({ withRelated: ['user'] })
            .then((tasksCollection: Collection<TasksModel>) => tasksCollection.toArray());

        return res.status(200).json({ data: items });
    }

    @Get(':id')
    @Middleware([ getUser() ])
    async get(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const item: TasksModel = await new TasksModel()
            .where('id', req.params.id)
            .where('user_id', userId)
            .fetch({ withRelated: ['user'] });

        if (!item) {
            return res.status(404).json();
        }

        return res.status(200).json(item.serialize());
    }

    @Post('')
    @Middleware([ getUser(), validateBody(tasksSchema.create) ])
    async create(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;
        const task: TasksModel = await new TasksModel({ ...req.body, userId }).save();

        return res.status(501).json(task.serialize());
    }

    @Put(':id')
    @Middleware([ getUser(), validateBody(tasksSchema.update) ])
    async update(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const item: TasksModel = await new TasksModel()
            .where('id', req.params.id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return res.status(404).json();
        }

        if (req.body.description) {
            item.set('description', req.body.description);
        }

        if (req.body.dueAt) {
            item.set('due_at', req.body.dueAt);
        }

        await item.save();
        return res.status(204).json();
    }

    @Delete(':id')
    @Middleware([ getUser() ])
    async delete(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const item: TasksModel = await new TasksModel()
            .where('id', req.params.id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return res.status(404).json();
        }

        await item.destroy();
        return res.status(204).json();
    }

    @Post(':id/markDone')
    @Middleware([ getUser() ])
    async markDone(req: ICustomRequest, res: Response): Promise<Response> {
        const userId: number = req.userId || 0;

        const item: TasksModel = await new TasksModel()
            .where('id', req.params.id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return res.status(404).json();
        }

        item.set('is_done', 1);
        item.set('done_at', new Date());
        await item.save();

        return res.status(204).json();
    }
}
