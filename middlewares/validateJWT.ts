import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {

     const token = req.header('Authorization');

     if(!token){
         return res.status(400).json({message: 'Token missing'})
     }
 
     try {
         
         jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
         next();
 
     } catch (error) {
         
         res.status(401).json({message: 'Invalid token'});
 
     }

    

}

export default validateJWT;