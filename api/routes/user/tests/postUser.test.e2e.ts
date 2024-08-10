import  { MongoUsersRepository } from '../../../repositories/user.repository';
import {beforeAll, afterAll, describe, expect, it} from '@jest/globals';
import HAPIServer from '../../../services/httpServer';

describe('POST /user', () => {
  let server: any;

    beforeAll(async () => {
      server = new HAPIServer();
    
        await server.initialize();
      
        await server.start();
    

        const usersRepository = new MongoUsersRepository();
        await usersRepository.clearAll();
     
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should return 200 and the new user when mail and password are provided', async () => {
        const response = await server.server.inject({
            method: 'POST',
            url: '/user',
            payload: {
                mail: 'john.doe@example.com',
                password: 'password'
            }
        });

        console.log(response);

        expect(response.statusCode).toBe(200);
        const result = JSON.parse(response.payload);
        console.log(result);
        // expect(result).toHaveProperty('id');
        // expect(result.name).toBe('John Doe');
        // expect(result.email).toBe('john.doe@example.com');
    });

    it('should return 400 if password or mail is missing', async () => {
        const response = await server.server.inject({
            method: 'POST',
            url: '/user',
            payload: {
                name: 'John Doe'
            } // Missing email
        });

        expect(response.statusCode).toBe(400);
        const result = JSON.parse(response.payload);
        expect(result).toHaveProperty('message', 'Invalid, mail or/and password are empty');
    });
});