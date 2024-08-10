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
  
    await client.close();

    return {
      _id: result.insertedId,
      mail,
      password
    };
   
  }

  async findUserByMail(mail: string) {
    const client = await mongodbService.mongoClient.connect();
    const db = client.db();
    const query = { mail: mail };

    const result = await db.collection(this.collectionName).findOne(query);
  
    await client.close();

    return result;
  }

  async findAllUsers() {
    const client = await mongodbService.mongoClient.connect();
    const db = client.db();

    const result = await db.collection(this.collectionName).find().toArray();
    await client.close();

    return result;
  }


  async clearAll() {
    const client = await mongodbService.mongoClient.connect();
    const db = client.db();

    await db.collection(this.collectionName).deleteMany({});
    await client.close();
    return;
  }
}
