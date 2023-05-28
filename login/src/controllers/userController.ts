import { Request, Response } from 'express';

import { create } from '../services/userService'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body;

    const newUser : boolean = await create( { email, password } );

    if(!newUser){
        return res.status(400).json({ message: 'User already exists' });
    }

    return res.status(200).json({ message: 'User successfully created' });
}