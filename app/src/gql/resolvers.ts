/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MutationLoginArgs,
  Event as EventType,
  MutationRegisterEventArgs,
  EventUpdateResponse,
  AuthPayLoad,
} from "../generated/graphql";
import { DecodedUser } from "../auth/UserAuth";
import { dateScalar } from "./scalar/dateScalar";
import { AuthenticationError } from "apollo-server-express";

export interface ContextInterface {
  dataSources: {
    events: {
      getAllEvents(): Promise<EventType[] | null>;
      registerEvent({
        event,
      }: MutationRegisterEventArgs): Promise<EventType | null>;
    };
    users: {
      login(email: string, password: string): Promise<string | null>;
    };
  };
  user?: DecodedUser;
}

export const resolvers = {
  Date: dateScalar,
  Query: {
    events: async (
      _parent: unknown,
      _req: unknown,
      { dataSources: { events }, user }: ContextInterface
    ): Promise<EventType[]> => {
      if (!user) throw new AuthenticationError("must authenticate");
      return (await events.getAllEvents()) || [];
    },
  },
  Mutation: {
    registerEvent: async (
      _parent: unknown,
      newEvent: MutationRegisterEventArgs,
      { dataSources: { events }, user }: ContextInterface
    ): Promise<EventUpdateResponse> => {
      if (!user) {
        throw new AuthenticationError("must authenticate");
      }
      const persistedEvent = await events.registerEvent(newEvent);
      return {
        success: !!persistedEvent,
        message: persistedEvent ? "Success" : "Fail",
        event: persistedEvent,
      };
    },
    login: async (
      _parent: unknown,
      user: MutationLoginArgs,
      { dataSources: { users } }: ContextInterface
    ): Promise<AuthPayLoad> => {
      const token = await users.login(user.data.email, user.data.password);
      return {
        token,
        message: token ? "Success" : "Fail",
      };
    },
  },
};
