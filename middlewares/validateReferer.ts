import { NextFunction, Request, Response } from "express";


const validateReferer = (req: Request, res: Response, next: NextFunction) => {
    const accessPoints : string[] = [`${process.env.DOMAIN_LG}/api/list`];

    if(!req.headers.referer || !accessPoints.includes(req.headers.referer)){
        return res.status(401).json({message: 'Access Unauthorized'});
    }

    next();
}

export default validateReferer;