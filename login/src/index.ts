import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';

import dbConnection from '../../database/dbConnection'
import usersRoutes from './routes/usersRoutes';


const app : Application = express();

dbConnection();

app.use(express.json());

const PORT = process.env.PORT_LG || 4001;

app.get('/ping', (_req: Request, res: Response) =>{
    console.log('Someone pinged here!!!');
    res.send('pong');
});

app.use('/api', usersRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server };