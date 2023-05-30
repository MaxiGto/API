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

export type UserCredentials = Omit<UserDB, '_id'>

export interface listingParams {
  page?: number;
  limit?: number;
  email?: string;
}

export interface UsersListResult {
  ok: boolean;
  users: UserCredentials[];
}
