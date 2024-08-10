
import { MongoUsersRepository }  from '../repositories/user.repository';

/**
 * Description of this function.
 *
 * @param {string} mail - mail of the user, is an unique identifier.
 * @param {string} password - password of the user.
 * @returns {null | {_id: string; mail: string; password: string}} Return null if the user already existe, else the new user with _id
 *
 * @example
 * // Example usage of the function
 * addUser("user@example.com", "securepassword123");
 */

export async function addUser(mail: string, password: string) {
  const usersRepository = new MongoUsersRepository();
  const isExist = await usersRepository.findUserByMail(mail);
  if(isExist) {
    return null;
  }
  const inserted = await usersRepository.createUser(mail, password);
  return inserted;
}