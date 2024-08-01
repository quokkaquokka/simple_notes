import { ServerRoute } from '@hapi/hapi';
import { Request, ResponseToolkit } from "@hapi/hapi";

export default {
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
        return 'Hello World!';
    }
} as ServerRoute;
