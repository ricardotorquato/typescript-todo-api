import { bookshelf } from '../config';

export class UsersModel extends bookshelf.Model<UsersModel> {
    get tableName(): string {
        return 'users';
    }

    get hasTimestamps(): boolean {
        return false;
    }
}
