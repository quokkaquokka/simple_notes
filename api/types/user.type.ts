import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  mail: string;
  password: string;
};
