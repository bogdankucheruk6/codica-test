import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'root',
    {
        dialect: 'postgres',
        host: `${process.env.DB_HOST}`,
        port: 5432
    }
);