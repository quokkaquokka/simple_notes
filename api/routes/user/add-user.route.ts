import { ServerRoute } from '@hapi/hapi';
import { Request, ResponseToolkit } from "@hapi/hapi";
import { addUser } from '../../controllers/user.controller';

export default {
    method: 'POST',
    path: '/user',
    handler: async (request: Request, h: ResponseToolkit) => {
      const {mail, password } = request.payload as Record<string, any>;
      if(mail == null || mail === '' || password == null || password === '') {
        return h.response({ message: 'Invalid, mail or/and password are empty', data: null }).code(400);
      }
      const newUser = await addUser(mail, password);

      return h.response({ message: 'Ok', data: newUser }).code(200);
    }
} as ServerRoute;