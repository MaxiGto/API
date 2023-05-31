import { Request, Response } from 'express';

import { UsersListResult, listingParams } from '../../../types/customTypes';
import { list } from '../services/businessService';

export const listUsers = async (req: Request, res: Response): Promise<Response> => {

    let { page, limit, email } : listingParams = req.query;

    const result : UsersListResult = await list(page, limit, email);

    const { ok, users } = result;

    if(!ok) return res.status(500).json({message: 'Error retrieving users - business'});

    return res.status(200).json(users);
   
}