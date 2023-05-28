import { Types } from "mongoose";

export interface UserDB {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

export type User = Omit<UserDB, '_id'>