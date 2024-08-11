import  { MongoUsersRepository } from '../../../repositories/user.repository';
import  { MongoCategoriesRepository } from '../../../repositories/category.repository';
import {beforeAll, afterAll, describe, expect, it} from '@jest/globals';
import HAPIServer from '../../../services/httpServer';
import { User } from '../../../types/user.type';

describe('POST /category', () => {
  let server: any;
  let user: User;

    beforeAll(async () => {
      server = new HAPIServer();
    
        await server.initialize();
      
        await server.start();
    
        const usersRepository = new MongoUsersRepository();
        const categoriesRepository = new MongoCategoriesRepository();

        await categoriesRepository.clearAll();
        await usersRepository.clearAll();

      user = await usersRepository.createUser('john.does@gmail.com', 'password');
     
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should return 200 and the new user when mail and password are provided', async () => {

        const response = await server.server.inject({
            method: 'POST',
            url: '/category',
            payload: {
                userId: user._id,
                name: 'Movies'
            }
        });

        expect(response.statusCode).toBe(200);
        
        const result = JSON.parse(response.payload);
        expect(result.data).toHaveProperty('name', 'Movies');
        expect(result.data.userId).toBe(user._id?.toString());
        expect(result.data).toHaveProperty('_id');
    });

    it('should return 400 if userId is missing', async () => {
        const response = await server.server.inject({
            method: 'POST',
            url: '/category',
            payload: {
                name: 'Songs'
            } // Missing userId
        });

        expect(response.statusCode).toBe(400);
        const result = JSON.parse(response.payload);
        expect(result).toHaveProperty('message', 'Invalid, userId or/and name are empty');
    });
    it('should return 400 if name categroy is missing', async () => {
      const response = await server.server.inject({
          method: 'POST',
          url: '/category',
          payload: {
              userId: user._id?.toString(),
          } // Missing name
      });

      expect(response.statusCode).toBe(400);
      const result = JSON.parse(response.payload);
      expect(result).toHaveProperty('message', 'Invalid, userId or/and name are empty');
  });
  it('should return 400, invalid userId', async () => {
    const response = await server.server.inject({
        method: 'POST',
        url: '/category',
        payload: {
            userId: 'NotGoodUserId', // '66b8882996c57fd4472c12d5',
            name: 'Pictures',
        }
    });

    expect(response.statusCode).toBe(400);
    const result = JSON.parse(response.payload);
    expect(result).toHaveProperty('message', 'Invalid, user doesn`t exist');
});
});