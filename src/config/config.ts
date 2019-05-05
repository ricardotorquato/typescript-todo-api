import * as dotenv from 'dotenv';
import { IConfig } from '../interfaces';

dotenv.config({ path: `${__dirname}/../../.env` });

export const config: IConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    database: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST || '',
            port: parseInt(process.env.DB_PORT || '', 10),
            user: process.env.DB_USER || '',
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        },
        pool: {
            min: 1,
            max: 4
        }
    }
};
