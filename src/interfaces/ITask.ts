import { IUser } from './IUser';

export interface ITask {
    id?: number;
    description: string;
    dueAt: Date;
    doneAt?: Date;
    isDone: boolean;
    userId?: number;
    user?: IUser;
}
