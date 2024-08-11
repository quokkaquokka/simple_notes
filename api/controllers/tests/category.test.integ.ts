import  { addUser } from '../user.controller';
import  { MongoUsersRepository } from '../../repositories/user.repository';
import  { MongoCategoriesRepository } from '../../repositories/category.repository';
import {beforeAll, beforeEach, describe, expect, test} from '@jest/globals';
import { User } from '../../types/user.type';
import { addCategory, getCategoriesUser } from '../category.controller';

describe('category', () => {
  const usersRepository = new MongoUsersRepository();
  const categoriesRepository = new MongoCategoriesRepository();
  let user: User;

  beforeAll(async () => {
    await usersRepository.clearAll();
    user = await usersRepository.createUser('john.does@gmail.com', 'password');
  });
  beforeEach(async () => {
    // clean the database to have independant test
    await categoriesRepository.clearAll();
    
  });

  test('should return a category with _id', async () => {
    if(user._id) {
      const expectedCategory = {
        userId: user._id.toString(),
        name: 'Movies'
      };
      const response = await addCategory(expectedCategory.userId, expectedCategory.name);
      expect(response).toHaveProperty('name', expectedCategory.name);
      expect(response?.userId.toString()).toBe(expectedCategory.userId);
      expect(response).toHaveProperty('_id');

    }
   
  });
  test('should find all category`s user', async () => {
    if(user._id) {
      const expectedCategory = {
        userId: user._id.toString(),
        name: 'Movies'
      };
      const expectedCategory2 = {
        userId: user._id.toString(),
        name: 'Songs'
      };
      await addCategory(expectedCategory.userId, expectedCategory.name);
      await addCategory(expectedCategory2.userId, expectedCategory2.name);

      const response = await getCategoriesUser(expectedCategory.userId);
      expect(response).toHaveLength(2);
    }
  });
});