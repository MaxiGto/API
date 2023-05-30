import bcrypt from 'bcrypt';

import UserSchema from '../models/User';
import { UserCredentials, UserDB, UsersListResult } from '../../../types/customTypes';
import { generateJWT } from '../../../helpers/generateJWT';
import { httpClientGet } from '../../../helpers/httpClient';


export const create = async (user: UserCredentials): Promise<boolean> => {

    const { email, password } = user;

    const existingUser = await UserSchema.findOne({email}, 'email');

    if(existingUser) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = new UserSchema(user);
    await newUser.save();

    return true;
}

export const authenticate = async (user: UserCredentials): Promise<string | undefined> => {

    const { email, password } = user;

    const existingUser : UserDB | null = await UserSchema.findOne({email});

    if(!existingUser) return;

    const validPassword = bcrypt.compareSync( password, existingUser.password );

    if(!validPassword) return;

    const token = await generateJWT( existingUser );

    return token;

}

export const list = async (token : string, page?: number, limit?: number, email?: string): Promise<UsersListResult> => {

    const url : string = `${process.env.DOMAIN_BS}/api/list`;
    const refererUrl : string = `${process.env.DOMAIN_LG}/api/list`;

    let response;
    const config : Object = { 
        headers: {
            referer: refererUrl, 'Authorization': token 
        },
        params: { 
            page, 
            limit, 
            email
        }}

    try {
        response = await httpClientGet(url, config);
    } catch (_error) {
       return {
        ok: false,
        users: []
       };
    }

    const usersList : UsersListResult = {
        ok: true,
        users: response.data
    }

    return usersList;
}