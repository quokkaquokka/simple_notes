import mongodbService from '../services/databaseMongoDb';


export class MongoUsersRepository {
  collectionName = 'users';

  async createTable() {
  }

 async createUser(mail: string, password: string) {

    const client = await mongodbService.mongoClient.connect();
    const db = client.db();

     const userDocument = {
      mail,
      password,
    };

    const result = await db.collection(this.collectionName).insertOne(userDocument);
  
    console.log(`Document inserted with ID: ${result.insertedId}`);
    await client.close();

    return {
      _id: result.insertedId,
      mail,
      password
    };
   
  }
}
