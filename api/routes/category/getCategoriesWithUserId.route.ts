import { ServerRoute } from '@hapi/hapi';
import { Request, ResponseToolkit } from "@hapi/hapi";
import { ObjectId } from 'mongodb';
import { getCategoriesUser } from '../../controllers/category.controller';

export default {
    method: 'GET',
    path: '/categories/{userId}',
    handler: async (request: Request, h: ResponseToolkit) => {
      const { userId } = request.params as Record<string, any>;
      if(userId == null || userId === '' || userId === undefined || !ObjectId.isValid(userId)) {
        return h.response({ message: 'Invalid userId', data: null }).code(400);
      }
      const categories = await getCategoriesUser(userId);
      if(!categories) {
        return h.response({ message: 'Invalid userId', data: null }).code(400);
      }

      return h.response({ message: 'Ok', data: categories }).code(200);
    }
} as ServerRoute;