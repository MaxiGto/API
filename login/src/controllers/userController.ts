import { Request, Response } from 'express';

import { authenticate, create, list } from '../services/userService'
import { listingParams } from '../../../types/customTypes';

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

    if(!token) return res.status(400).json({ message: 'Authentication failed' });

    return res.status(200).json({ token });
}

export const listUsers = async (req: Request, res: Response): Promise<Response> => {

    const { page, limit, email } : listingParams = req.query;


    const users = await list(<string>req.headers['Authorization'], page, limit, email);

    return res.status(200).json({ users });

}