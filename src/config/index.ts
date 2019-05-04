import { IConfig } from '../interfaces';

const config: IConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};

export default config;
