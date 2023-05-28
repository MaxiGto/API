import { Request, Response } from 'express';

import { authenticate, create } from '../services/userService'

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