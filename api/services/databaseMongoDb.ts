import { MongoClient } from 'mongodb';

class MongodbService {
  mongoClient: MongoClient;

  constructor(url: string) {
    this.mongoClient = new MongoClient(url, {
      minPoolSize: 1,
      maxPoolSize: 10,
    });
  }
}

const mongodbService = new MongodbService('YOUR DATABASE');

export default mongodbService;
