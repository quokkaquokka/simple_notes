'use strict';

import Hapi from '@hapi/hapi';
import helloRoute from '../routes/hello-word.route';


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
  
  }

  async start() {
    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }
}
