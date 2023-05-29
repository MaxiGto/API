import { Request, Response } from 'express';

import { authenticate, create, list } from '../services/userService'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body;

    const newUser : boolean = await create( { email, password } );

    if(!newUser){
        return res.status(400).json({ message: 'User already exists' });
    }

    return res.status(200).json({ message: 'User successfully created' });
}

export const authenticateUser = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body;

    const token = await authenticate( { email, password } );

    if(!token) return res.status(400).json({ messsage: 'Authentication failed' });

    return res.status(200).json({ token });
}

export const listUsers = async (req: Request, res: Response): Promise<Response> => {

    const { page, limit } = req.query;
    let nPage : number = Number(page);
    let nLimit : number = Number(limit);

    if(!page || Number(page) < 1 || isNaN(nPage)){
        nPage = 1;
    }
    if(!nLimit || Number(nLimit) < 1 || isNaN(nLimit)){
        nLimit = 10;
    }

    const users = await list(<string>req.headers['x-auth-token'], nPage, nLimit);

    return res.status(200).json({ users });

}