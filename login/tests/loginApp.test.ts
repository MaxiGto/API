import supertest, { Response } from 'supertest';

import { app, server } from '../src/index';
import { server as bsServer } from '../../business/src/index';
import dbConnection, { dbDisconnection } from '../../database/dbConnection';
import User from '../src/models/User';
import { UserCredentials } from '../../types/customTypes';
import users from '../../database/users.json';

describe('Login microservice', () => {

  const api = supertest(app);

  beforeAll(async () => {
      process.env.NODE_ENV = 'test';
      await dbConnection();

      await User.deleteMany();

      for await(const user of users){

        const { email, password } : UserCredentials = user;

        await api
        .post('/api/register')
        .send( { email, password } );
      }
  });

  describe('User registration', () => {

      test('should register a new user', async () => {
        const payload : UserCredentials = {
          email: 'test@example.com',
          password: '123456',
        }

        const response : Response = await api
          .post('/api/register')
          .send(payload);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User successfully created');

      });

      test('user already exists', async () => {
        const payload : UserCredentials= {
          email: 'example@example.com',
          password: '123456',
        }

        const response : Response = await api
          .post('/api/register')
          .send(payload);
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'User already exists');

      });

      afterAll(async () => {
        await User.deleteOne({email: 'test@example.com'});
      })

  })

  describe('User authentication', () => {
    test('successful athentication', async () => {
      const payload : UserCredentials = {
        email: 'example@example.com',
        password: '123456',
      }

      const response : Response = await api
          .post('/api/auth')
          .send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    test('failed athentication - wrong email', async () => {
      const payload : UserCredentials = {
        email: 'example@gmail.com',
        password: '123456',
      }

      const response : Response = await api
          .post('/api/auth')
          .send(payload);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Authentication failed');
    });

    test('failed athentication - wrong password', async () => {
      const payload : UserCredentials = {
        email: 'example@example.com',
        password: '12345',
      }

      const response : Response = await api
          .post('/api/auth')
          .send(payload);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Authentication failed');
    });

  });

  describe('User listing', () => {

    let token : string;

    beforeAll(async() => {
      bsServer;

      const payload : UserCredentials = {
        email: 'example@example.com',
        password: '123456',
      }

      const response : Response = await api
          .post('/api/auth')
          .send(payload);

      token = response.body.token;
    });

    test('Bad request - token missing', async () => {

      const response : Response = await api
        .get('/api/list')

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message','Token missing');
    });

    test('Unauthorized - invalid token', async () => {

      const response : Response = await api
        .get('/api/list')
        .set('Authorization', 'fake-token');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message','Invalid token');
    });

    test('should list all users', async () => {

      const response : Response = await api
        .get('/api/list')
        .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(response.body.users).toHaveLength(users.length);
    });

    test('should list a maximum number of users', async () => {

      const limit : number = 5;

      const response : Response = await api
        .get(`/api/list?limit=${limit}`)
        .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(response.body.users).toHaveLength(limit);
    });

    test('should list all users with email matching search', async () => {

      const email : string = 'test';
      const regex : RegExp = new RegExp(email);

      const requestedUsers : UserCredentials[] = users.filter(user => user.email.match(regex));

      const response : Response = await api
        .get(`/api/list?email=${email}`)
        .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(response.body.users).toHaveLength(requestedUsers.length);
    });

  });

  afterAll(async () => {
    await dbDisconnection();
      server.close();
      bsServer.close();
  });

});