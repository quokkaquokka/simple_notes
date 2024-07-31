'use strict';

import Hapi from '@hapi/hapi';


export default class HAPIServer {
  server: Hapi.Server;

  constructor() {
    this.server = Hapi.server({
      port: 8080,
      host: 'localhost'
  });
  }


  async initialize() {

    

    // this.server.route(versionRoute);



  }

  async start() {
    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }
}
