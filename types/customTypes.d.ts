import { Types } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload;
    }
  }
}
export interface UserDB {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

export type ICreateUser = Omit<UserDB, '_id'>

