import { Request, Response } from 'express';

import userSchema from '../../../login/src/models/User';

export const listUsers = async (req: Request, res: Response): Promise<Response> => {

    const accessPoints : string[] = [`${process.env.DOMAIN_LG}${req.originalUrl}`];

    if(!req.headers.referer || !accessPoints.includes(req.headers.referer)){
        return res.status(401).json({msg: 'Access Unauthorized'});
    }

    const { page, limit } = req.headers;
    let nPage : number = Number(page);
    let nLimit : number = Number(limit);

    if(!page || Number(page) < 1 || isNaN(nPage)){
        nPage = 1;
    }
    if(!nLimit || Number(nLimit) < 1 || isNaN(nLimit)){
        nLimit = 10;
    }
    const skip = (nPage - 1) * nLimit;

    const users = await userSchema.find().skip(skip).limit(nLimit);

    return res.status(200).json(users);
   
}