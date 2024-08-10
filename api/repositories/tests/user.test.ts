import  { MongoUsersRepository } from '../user.repository';
import {beforeEach, describe, expect, test} from '@jest/globals';

describe('user', () => {
  const usersRepository = new MongoUsersRepository();
  beforeEach(async () => {
    // clean the database to have independant test
    await usersRepository.clearAll();
    
  });

  test('should create an user and return a user with _id', async () => {
    const expectedUser = {
      mail: 'john.doe@example.com',
      password: 'password'
    };
    const response = await usersRepository.createUser(expectedUser.mail, expectedUser.password)
    expect(response).toHaveProperty('mail', expectedUser.mail);
    expect(response).toHaveProperty('password', expectedUser.password);
    expect(response).toHaveProperty('_id');
  });
  test('should get all user', async () => {
    const expectedUser = {
      mail: 'jonathan.doe@example.com',
      password: 'password123'
    };
    const expectedUser2 = {
      mail: 'john.doe@example.com',
      password: 'password'
    };

    await usersRepository.createUser(expectedUser.mail, expectedUser.password)
    await usersRepository.createUser(expectedUser2.mail, expectedUser2.password)

    const response = await usersRepository.findAllUsers();
    
    expect(response).toHaveLength(2);
  });
  test('should clear all user', async () => {
    const expectedUser = {
      mail: 'jonathan.doe@example.com',
      password: 'password123'
    };

    const userCreated = await usersRepository.createUser(expectedUser.mail, expectedUser.password)
    expect(userCreated).toHaveProperty('mail', expectedUser.mail);
    expect(userCreated).toHaveProperty('password', expectedUser.password);
    expect(userCreated).toHaveProperty('_id');

    await usersRepository.clearAll();

    const response = await usersRepository.findAllUsers();
    
    expect(response.length).toBe(0);
  });
  test('should get user with mail', async () => {
    const expectedUser = {
      mail: 'jonathan.doe@example.com',
      password: 'password123'
    };

    const response = await usersRepository.createUser(expectedUser.mail, expectedUser.password)
    expect(response).toHaveProperty('mail', expectedUser.mail);
    expect(response).toHaveProperty('password', expectedUser.password);
    expect(response).toHaveProperty('_id');

    const user = await usersRepository.findUserByMail(expectedUser.mail);

    expect(user).not.toBe(null);
    if(user) {
      expect(expectedUser.password).toBe(user.password);
    }
  });
});