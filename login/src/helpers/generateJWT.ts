import jwt from 'jsonwebtoken';
import { UserDB } from '../../../types/customTypes';


export const generateJWT = ( user: UserDB): Promise<string> => {

    return new Promise( (resolve, reject) => {

        const payload = { id: user._id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '4h'
        }, (err, token) => {

            if(token) {
                resolve(token);
            } else if (err) {
                console.log(err);
                reject('Could not generate JWT');
            }

        });


    });

}