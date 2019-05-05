import * as Bookshelf from 'bookshelf';
import { knex } from './knex';

export const bookshelf: Bookshelf = Bookshelf(knex);
