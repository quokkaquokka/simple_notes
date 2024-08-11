'use strict';

import Hapi from '@hapi/hapi';
import helloRoute from '../routes/hello-word.route';
import addUserRoute from '../routes/user/add-user.route';
import addCategoryRoute from '../routes/category/postCategory.route';
import getCategoriesRoute from '../routes/category/getCategoriesWithUserId.route';


export default class HAPIServer {
  server: Hapi.Server;

  constructor() {
    this.server = Hapi.server({
      port: 8080,
      host: 'localhost'
  });
  }


  async initialize() {
    // add all route in this place
    this.server.route(helloRoute);
    this.server.route(addUserRoute);
    this.server.route(addCategoryRoute);
    this.server.route(getCategoriesRoute);
  
  }

  async start() {
    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }

  async stop() {
    await this.server.stop();
    console.log('Server stop');
  }
}
