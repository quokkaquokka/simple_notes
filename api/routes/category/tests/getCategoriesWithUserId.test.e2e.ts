import  { MongoUsersRepository } from '../../../repositories/user.repository';
import  { MongoCategoriesRepository } from '../../../repositories/category.repository';
import {beforeAll, afterAll, describe, expect, it} from '@jest/globals';
import HAPIServer from '../../../services/httpServer';
import { User } from '../../../types/user.type';

describe('GET /categories', () => {
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
      if(user._id) {
        await categoriesRepository.createCategory(user._id?.toString(), 'Movies');
        await categoriesRepository.createCategory(user._id?.toString(), 'Pictures');
      }
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should return 200 and the new user when mail and password are provided', async () => {

        const response = await server.server.inject({
            method: 'GET',
            url: `/categories/${user._id?.toString()}`,
        });

        expect(response.statusCode).toBe(200);
        
        const result = JSON.parse(response.payload);
        expect(result.data).toHaveLength(2);
    });
    it('should return 400 and userId is not a good format', async () => {

      const response = await server.server.inject({
          method: 'GET',
          url: '/categories/NotGoodFormat',
      });

      expect(response.statusCode).toBe(400);
      
      const result = JSON.parse(response.payload);
      expect(result).toHaveProperty('message', 'Invalid userId');
  });
  it('should return 400 and userId is empty', async () => {

    const response = await server.server.inject({
        method: 'GET',
        url: '/categories/null',
    });

    expect(response.statusCode).toBe(400);
    
    const result = JSON.parse(response.payload);
    expect(result).toHaveProperty('message', 'Invalid userId');
  });
});