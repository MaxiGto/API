import { Request, Response } from 'express';

import userSchema from '../../../login/src/models/User';
import { listingParams } from '../../../types/customTypes';

export const listUsers = async (req: Request, res: Response): Promise<Response> => {

    const accessPoints : string[] = [`${process.env.DOMAIN_LG}/api/list`];

    console.log(accessPoints);
    console.log(req.headers.referer);

    if(!req.headers.referer || !accessPoints.includes(req.headers.referer)){
        return res.status(401).json({message: 'Access Unauthorized'});
    }

    let { page, limit, email } : listingParams = req.query;

    if(page && isNaN(page)) page = 1;
    if(limit && isNaN(limit)) limit = 10;
    if(!email) email = '';
    const regex = new RegExp(email, "i");

    let query = userSchema.find({ email: { $regex: regex } });
    if(page){
        if(!limit || isNaN(limit)) limit = 10; 
        const skip = (page - 1) * limit;
        query.skip(skip)
    }
    if(limit) query.limit(limit)

    const users = await query;

    return res.status(200).json(users);
   
}