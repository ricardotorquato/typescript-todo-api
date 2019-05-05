import * as Knex from 'knex';
import { config } from './config';

export const knex: Knex = Knex(config.database);
