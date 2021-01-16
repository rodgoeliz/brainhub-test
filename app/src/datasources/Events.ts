import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";
import {
  EventUpdateResponse,
  MutationRegisterEventArgs,
  Event as EventType,
} from "../generated/graphql";

interface EventDocument {
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

export default class Events extends MongoDataSource<EventDocument> {
  async getEvent(eventId: string) {
    const eventDoc = await this.findOneById(eventId);
    return eventDoc ? transformEventDocument(eventDoc) : null;
  }

  async getAllEvents() {
    return (await this.collection.find().toArray()).map(transformEventDocument);
  }

  async registerEvent(
    event: MutationRegisterEventArgs
  ): Promise<EventUpdateResponse> {
    const { ops, insertedCount } = await this.collection.insertOne(event);

    if (insertedCount === 0)
      return { success: false, message: "Error on update", event: null };

    return {
      success: true,
      message: "Success",
      event: ops.map(transformEventDocument),
    };
  }
}
