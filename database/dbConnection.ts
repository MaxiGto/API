//import { ProcessEnv } from '../types/types'; 

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';


const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect((process.env.DATABASE_URL as string));
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;