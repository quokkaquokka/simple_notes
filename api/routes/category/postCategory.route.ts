import { ServerRoute } from '@hapi/hapi';
import { Request, ResponseToolkit } from "@hapi/hapi";
import { addCategory } from '../../controllers/category.controller';

export default {
    method: 'POST',
    path: '/category',
    handler: async (request: Request, h: ResponseToolkit) => {
      const { userId, name } = request.payload as Record<string, any>;
      if(userId == null || userId === '' || userId === undefined || name == null || name === '' || name === undefined) {
        return h.response({ message: 'Invalid, userId or/and name are empty', data: null }).code(400);
      }
      const newCategory = await addCategory(userId, name);
      if(!newCategory) {
        return h.response({ message: 'Invalid, user doesn`t exist', data: null }).code(400);
      }

      return h.response({ message: 'Ok', data: newCategory }).code(200);
    }
} as ServerRoute;