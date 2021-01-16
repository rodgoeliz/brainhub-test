import { IResolvers } from "apollo-server-express";
import Events from "../datasources/Events";
import {
  MutationRegisterEventArgs,
  QueryEventArgs,
} from "../generated/graphql";
import { dateScalar } from "./scalar/dateScalar";

export const resolvers: IResolvers = {
  Date: dateScalar,
  Query: {
    event: (
      _parent,
      { eventId }: QueryEventArgs,
      { dataSources: { events } }
    ) => {
      return events.getEvent(eventId);
    },
    events: (
      _parent,
      _args,
      { dataSources: { events } }: { dataSources: { events: Events } }
    ) => {
      return events.getAllEvents();
    },
  },
  Mutation: {
    registerEvent: (
      _parent,
      newEvent: MutationRegisterEventArgs,
      { dataSources: { events } }: { dataSources: { events: Events } }
    ) => {
      return events.registerEvent({
        name: newEvent.name,
        lastName: newEvent.lastName,
        email: newEvent.email,
        eventDate: newEvent.eventDate,
      });
    },
  },
};
