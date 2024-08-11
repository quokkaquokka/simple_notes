
import { MongoUsersRepository }  from '../repositories/user.repository';

/**
 * Description of addUser.
 *
 * @param {string} mail - mail of the user, is an unique identifier.
 * @param {string} password - password of the user.
 * @returns {null | {_id: string; mail: string; password: string}} Return null if the user already exist, else the new user with _id
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

/**
 * Description of findById.
 *
 * @param {string} userId - id of the user, is an unique identifier.
 * @returns {null | {_id: string; mail: string; password: string}} Return null if the user doesn't exist, else the user
 *
 * @example
 * // Example usage of the function
 * findById("66b88e74a072a294a356f7b6")
 */
export async function findById(userId: string) {
  const usersRepository = new MongoUsersRepository();
  return  await usersRepository.findUserById(userId);
}