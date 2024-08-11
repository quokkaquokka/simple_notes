
import { MongoUsersRepository }  from '../repositories/user.repository';
import { MongoCategoriesRepository }  from '../repositories/category.repository';
import { ObjectId } from 'mongodb';

/**
 * Description of addCategory.
 *
 * @param {string} userId - id of the user, is an unique identifier.
 * @param {string} name - name of category, there is no an unique identifier.
 * @returns {null | {_id: string; userId: string; name: string}} Return null if the user doesn't existe, else the new category with _id
 *
 * @example
 * // Example usage of the function
 * addCategory("66b88e74a072a294a356f7b6", "Movies");
 */

export async function addCategory(userId: string, name: string) {
  const categoriesRepository = new MongoCategoriesRepository();
  const usersRepository = new MongoUsersRepository();
  
  if(!userId || !name ||!ObjectId.isValid(userId) ) {
    return null
  }
    
  const user = await usersRepository.findUserById(userId);

  if(!user) {
    return null;
  }
  const newCategory = await categoriesRepository.createCategory(userId, name);
  return newCategory;
}

/**
 * Description of getCategoriesUser.
 *
 * @param {string} userId - id of the user, is an unique identifier.
 * @returns {null | {_id: string; userId: string; name: string}[]} Return null if the user doesn't existe, else categories of user.
 *
 * @example
 * // Example usage of the function
 * getCategoriesUser("66b88e74a072a294a356f7b6");
 */

export async function getCategoriesUser(userId: string) {
  const categoriesRepository = new MongoCategoriesRepository();
  if(!ObjectId.isValid(userId)) {
    return null
  }

  const categories = await categoriesRepository.findAllCategoriesByUserId(userId);
  return categories;
}