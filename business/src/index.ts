import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';

import dbConnection from '../../database/dbConnection'
import businessRoutes from './routes/businessRoutes';


const app : Application = express();

dbConnection();

app.use(express.json());

const PORT = process.env.PORT_BS || 4002;

app.get('/ping', (_req: Request, res: Response) =>{
    console.log('Someone pinged here!!!');
    res.send('pong');
});

app.use('/api', businessRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server }