import userSchema from '../../../login/src/models/User';
import { UserCredentials, UsersListResult } from '../../../types/customTypes';

export const list = async (page?: number, limit?: number, email?: string): Promise<UsersListResult> => {

    const regex = new RegExp(<string>email, "i");

    let query = userSchema.find({ email: { $regex: regex } });
    if(page){
        if(!limit || isNaN(limit)) limit = 10; 
        const skip = (page - 1) * limit;
        query.skip(skip)
    }
    if(limit) query.limit(limit);

    let users : UserCredentials[]

    try {
        users = await query;
    } catch (error) {
        return {
            ok: false,
            users: []
           };
    }

    const result : UsersListResult = {
        ok: true,
        users
    }

    return result;

}

