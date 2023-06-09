import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';


const dbConnection = async (): Promise<void> => {
    const DB_URL = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
    try {
        await mongoose.connect(DB_URL!);
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
}

export const dbDisconnection = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        console.log('DB disconnected');
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;