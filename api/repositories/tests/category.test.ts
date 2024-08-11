import  { MongoCategoriesRepository } from '../category.repository';
import  { MongoUsersRepository } from '../user.repository';
import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { User } from '../../types/user.type';

describe('category', () => {
  const categoriesRepository = new MongoCategoriesRepository();
  const usersRepository = new MongoUsersRepository();
  let user: User;
  let user2: User;
  beforeAll(async () => {
    await usersRepository.clearAll();
    user = await usersRepository.createUser('john.does@gmail.com', 'password');
    user2 = await usersRepository.createUser('john.john@gmail.com', 'password1234'); 
  });
  
  beforeEach(async () => {
    // clean the database to have independant test
    await categoriesRepository.clearAll();
    
  });

  test('should create an category and return a category with _id', async () => {
    if(user._id) {
    const expectedCategory = {
      userId: user._id.toString(),
      categoryName: 'Example'
    };
    const response = await categoriesRepository.createCategory(expectedCategory.userId, expectedCategory.categoryName);
    expect(response).toHaveProperty('name', expectedCategory.categoryName);
    expect(response.userId.toString()).toBe(expectedCategory.userId.toString());
    expect(response).toHaveProperty('_id');
    }
  });
  test('should get all user`s categories', async () => {
  if(user._id) {
    const expectedCategory = {
      userId: user._id.toString(),
      categoryName: 'Example'
    };
    const expectedCategory2 = {
      userId: user._id.toString(),
      categoryName: 'Livres'
    };
    await categoriesRepository.createCategory(expectedCategory.userId, expectedCategory.categoryName);
    await categoriesRepository.createCategory(expectedCategory2.userId, expectedCategory2.categoryName);
  }
  if(user2._id) {
    const expectedCategory3 = {
      userId: user2._id.toString(),
      categoryName: 'Movies'
    };

    await categoriesRepository.createCategory(expectedCategory3.userId, expectedCategory3.categoryName);
  }

  if(user._id) {
    const response = await categoriesRepository.findAllCategoriesByUserId(user._id.toString());
    expect(response).toHaveLength(2);
  }
  });
  test('should clear all categories', async () => {
    if(user._id) {
      const expectedCategory = {
        userId: user._id.toString(),
        categoryName: 'Example'
      };
      const expectedCategory2 = {
        userId: user._id.toString(),
        categoryName: 'Livres'
      };
        await categoriesRepository.createCategory(expectedCategory.userId, expectedCategory.categoryName);
        await categoriesRepository.createCategory(expectedCategory2.userId, expectedCategory2.categoryName);

        const categories = await categoriesRepository.findAllCategoriesByUserId(user._id.toString());
        expect(categories).toHaveLength(2);

        await categoriesRepository.clearAll();

        const response = await categoriesRepository.findAllCategoriesByUserId(user._id.toString());
        expect(response).toHaveLength(0);

      }
  });
});