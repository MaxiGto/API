import supertest, { Response } from 'supertest';

import { app, server } from '../../login/src/index';
import { app as bsApp, server as bsServer } from '../src/index';
import dbConnection, { dbDisconnection } from '../../database/dbConnection';
import { UserCredentials } from '../../types/customTypes';

const apiBS = supertest(bsApp);
const apiLG = supertest(app);

describe('Business microservice', () => {

    process.env.NODE_ENV = 'test';

    describe('User listing', () => {

        let token : string;

        beforeAll(async() => {
            const payload : UserCredentials = {
                email: 'example@example.com',
                password: '123456',
            }

            await apiLG
            .post('/api/register')
            .send(payload);
        
            const response : Response = await apiLG
                .post('/api/auth')
                .send(payload);
        
            token = response.body.token;
        });

        test('Unauthorized access', async () => {
            const response : Response = await apiBS
                .get('/api/list')
                .set('Authorization', token);
    
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Access Unauthorized');
        });

    });


    afterAll(async () =>{
        await dbDisconnection();
        server.close();
        bsServer.close();
    });

});