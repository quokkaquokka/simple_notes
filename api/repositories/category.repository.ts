import { ObjectId } from 'bson';
import mongodbService from '../services/databaseMongoDb';


export class MongoCategoriesRepository {
  collectionName = 'categories';

  async createTable() {
  }

 async createCategory(userId: string, name: string) {
    const client = await mongodbService.mongoClient.connect();
  
    const db = client.db();

     const categoryDocument = {
      userId: new ObjectId(userId),
      name,
    };

    const result = await db.collection(this.collectionName).insertOne(categoryDocument);
  
    await client.close();

    return {
      _id: result.insertedId,
      ...categoryDocument
    };
   
  }

  async findAllCategoriesByUserId(userId: string) {
    const client = await mongodbService.mongoClient.connect();
    const db = client.db();
    const query = { userId: new ObjectId(userId) };

    const result = await db.collection(this.collectionName).find(query).toArray();
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
