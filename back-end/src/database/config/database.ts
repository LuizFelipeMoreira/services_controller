/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const connection = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: process.env.DB_DIALECT as any,
    }
);

export default connection;
