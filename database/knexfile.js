require('dotenv').config({ path: `${__dirname}/../.env` });

module.exports = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: 'utf8mb4'
        },
        pool: {
            min: 2,
            max: 4,
        },
        migrations: {
            tableName: 'migrations',
            directory: `${__dirname}/migrations`,
        },
    }
};
