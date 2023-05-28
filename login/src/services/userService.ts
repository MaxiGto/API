import bcrypt from 'bcrypt';

import UserSchema from '../models/User';
import { User } from '../../../types/customTypes';
import { generateJWT } from '../helpers/generateJWT';

export const create = async (user: User): Promise<boolean> => {

    const { email, password } = user;

    const existingUser = await UserSchema.findOne({email}, 'email');

    if(existingUser) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = new UserSchema(user);
    await newUser.save();

    return true;
}

export const authenticate = async (user: User): Promise<string | undefined> => {

    const { email, password } = user;

    const existingUser = await UserSchema.findOne({email});

    if(!existingUser) return;

    const validPassword = bcrypt.compareSync( password, existingUser.password );

    if(!validPassword) return;

    const token = await generateJWT( existingUser );

    return token;

}