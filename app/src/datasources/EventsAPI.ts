/* eslint-disable no-console */
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";
import {
  MutationRegisterEventArgs,
  Event as EventType,
} from "../generated/graphql";

export interface EventDocument {
  _id: ObjectId;
  name: string;
  lastName: string;
  email: string;
  eventDate: Date;
}

const transformEventDocument = (eventDoc: EventDocument): EventType => ({
  id: `${eventDoc._id}`,
  name: eventDoc.name,
  lastName: eventDoc.lastName,
  email: eventDoc.email,
  eventDate: eventDoc.eventDate,
});

export class EventsAPI extends MongoDataSource<EventDocument> {
  async getAllEvents() {
    try {
      return (
        (await this.collection.find().toArray()).map(transformEventDocument) ||
        []
      );
    } catch ({ message }) {
      console.error(message);
      return null;
    }
  }

  async registerEvent({
    event,
  }: MutationRegisterEventArgs): Promise<EventType | null> {
    try {
      const { ops, insertedCount } = await this.collection.insertOne(event);
      if (insertedCount === 0) return null;
      const [dbEvent] = ops.map(transformEventDocument);
      return dbEvent;
    } catch ({ message }) {
      console.error(message);
      return null;
    }
  }
}
