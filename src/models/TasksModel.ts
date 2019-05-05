import { Collection } from 'bookshelf';

import { bookshelf } from '../config';
import { UsersModel } from './UsersModel';
import { ITask } from '../interfaces';

export class TasksModel extends bookshelf.Model<TasksModel> {
    get tableName(): string {
        return 'tasks';
    }

    get hasTimestamps(): boolean {
        return false;
    }

    public customSerialize(): ITask {
        const serialized: any = this.serialize();

        const task: ITask = {
            id: serialized.id,
            description: serialized.description,
            dueAt: serialized.dueAt,
            isDone: serialized.isDone
        };

        if (serialized.doneAt) {
            task.doneAt = serialized.doneAt;
        }

        if (serialized.user) {
            task.user = {
                id: serialized.user.id,
                name: serialized.user.name,
                email: serialized.user.email
            };
        } else {
            task.userId = serialized.userId
        }

        return task;
    }

    public async findAllByUserId(userId: number): Promise<ITask[]> {
        return await this.where('user_id', userId)
            .fetchAll({ withRelated: ['user'] })
            .then((tasksCollection: Collection<TasksModel>) => tasksCollection.toArray())
            .then((tasks: TasksModel[]) => {
                return tasks.map<ITask>((task: TasksModel) => task.customSerialize());
            });
    }

    public async findOneByIdAndUserId(id: number, userId: number, related: string[] = []): Promise<ITask> {
        return await this
            .where('id', id)
            .where('user_id', userId)
            .fetch({ withRelated: related })
            .then((task: TasksModel) => {
                if (task) {
                    return task.customSerialize()
                }

                return null as unknown as ITask;
            });
    }

    public async store(task: ITask): Promise<ITask> {
        return new TasksModel(task)
            .save()
            .then((task: TasksModel) => task.customSerialize());
    }

    public async updateByIdAndUserId(id: number, userId: number, update: { description?:string, dueAt?:Date }): Promise<number> {
        const item: TasksModel = await this
            .where('id', id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return null as unknown as number;
        }

        if (update.description) {
            item.set('description', update.description);
        }

        if (update.dueAt) {
            item.set('due_at', update.dueAt);
        }

        await item.save();

        return item.id;
    }

    public async deleteByIdAndUserId(id: number, userId: number): Promise<number> {
        const item: TasksModel = await this
            .where('id', id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return null as unknown as number;
        }

        const deletedId: number = item.id;
        await item.destroy();

        return deletedId;
    }

    public async markDoneByIdAndUserId(id: number, userId: number): Promise<number> {
        const item: TasksModel = await this
            .where('id', id)
            .where('user_id', userId)
            .fetch();

        if (!item) {
            return null as unknown as number;
        }

        item.set('is_done', 1);
        item.set('done_at', new Date());
        await item.save();

        return item.id;
    }

    public user(): UsersModel {
        return this.belongsTo(UsersModel);
    }
}
