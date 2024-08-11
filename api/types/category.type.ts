import { ObjectId } from "mongodb";

export type Category = {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  color: string | null;
};
