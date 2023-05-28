import bcrypt from 'bcrypt';

import UserSchema from '../models/User';
import { User } from '../../../types/customTypes';

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