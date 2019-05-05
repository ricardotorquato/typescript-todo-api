import * as Knex from 'knex';

export interface IConfig {
    port: number;
    database: Knex.Config;
}
