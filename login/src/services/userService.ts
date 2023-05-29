import bcrypt from 'bcrypt';
import axios, { AxiosResponse } from 'axios';

import UserSchema from '../models/User';
import { ICreateUser, UserDB } from '../../../types/customTypes';
import { generateJWT } from '../../../helpers/generateJWT';


export const create = async (user: ICreateUser): Promise<boolean> => {

    const { email, password } = user;

    const existingUser = await UserSchema.findOne({email}, 'email');

    if(existingUser) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = new UserSchema(user);
    await newUser.save();

    return true;
}

export const authenticate = async (user: ICreateUser): Promise<string | undefined> => {

    const { email, password } = user;

    const existingUser : UserDB | null = await UserSchema.findOne({email});

    if(!existingUser) return;

    const validPassword = bcrypt.compareSync( password, existingUser.password );

    if(!validPassword) return;

    const token = await generateJWT( existingUser );

    return token;

}

export const list = async (token : string, page: number, limit: number): Promise<UserDB[]> => {

    const url : string = `${process.env.DOMAIN_BS}/api/list`;
    const refererUrl : string = `${process.env.DOMAIN_LG}/api/list`;

    const { data: users } : AxiosResponse = await axios.get(url, { headers: {id: 1, referer: refererUrl, 'x-auth-token': token, page, limit }});

    return users;
}