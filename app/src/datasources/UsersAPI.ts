/* eslint-disable no-console */
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";
import { generateUserToken, matchUser } from "../auth/UserAuth";
import { User as UserType } from "../generated/graphql";

export interface UserDocument {
  _id: ObjectId;
  password: string;
  email: string;
}

export const transformUserDocument = (userDoc: UserDocument): UserType => ({
  id: `${userDoc._id}`,
  email: userDoc.email,
  password: userDoc.password,
});

export class UsersAPI extends MongoDataSource<UserDocument> {
  async login(email: string, password: string): Promise<string | null> {
    try {
      const userDoc = await this.collection.findOne({ email: { $eq: email } });
      if (!userDoc) return null;
      if (!matchUser(password, userDoc.password)) return null;
      return generateUserToken(transformUserDocument(userDoc));
    } catch ({ message }) {
      console.error(message);
      return null;
    }
  }
}
