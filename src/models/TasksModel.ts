import { bookshelf } from '../config';
import { UsersModel } from './UsersModel';

export class TasksModel extends bookshelf.Model<TasksModel> {
    get tableName(): string {
        return 'tasks';
    }

    get hasTimestamps(): boolean {
        return false;
    }

    public user(): UsersModel {
        return this.belongsTo(UsersModel);
    }
}
