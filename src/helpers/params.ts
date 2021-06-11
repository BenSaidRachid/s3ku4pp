import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT || '4242', 10);
export const HOST = process.env.HOST || '0.0.0.0';
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET || '&{cQq_9Z';

export default {
    NODE_ENV,
    PORT,
    HOST,
    DATABASE_URL,
    JWT_SECRET,
};
