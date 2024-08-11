import  { addUser } from '../user.controller';
import  { MongoUsersRepository } from '../../repositories/user.repository';
import {beforeEach, describe, expect, test} from '@jest/globals';

describe('user', () => {
  const usersRepository = new MongoUsersRepository();
  beforeEach(async () => {
    // clean the database to have independant test
    await usersRepository.clearAll();
    
  });

  test('should return a user with _id', async () => {
    const expectedUser = {
      mail: 'john.doe@example.com',
      password: 'password'
    };
    const response = await addUser(expectedUser.mail, expectedUser.password);
    expect(response).toHaveProperty('mail', expectedUser.mail);
    expect(response).toHaveProperty('password', expectedUser.password);
    expect(response).toHaveProperty('_id');
  });
  test('should return a user null', async () => {
    const expectedUser = {
      mail: 'john.doe@example.com',
      password: 'password'
    };
    await addUser(expectedUser.mail, expectedUser.password);

    const response = await addUser(expectedUser.mail, expectedUser.password);
    expect(response).toBe(null);
  });
});