import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
  }

  type Event {
    id: ID!
    name: String!
    lastName: String!
    email: String!
    eventDate: Date!
  }

  type Query {
    events: [Event]
    event(eventId: ID!): Event
  }

  type EventUpdateResponse {
    success: Boolean!
    message: String
    event: [Event]
  }

  type Mutation {
    registerEvent(
      name: String!
      lastName: String!
      email: String!
      eventDate: Date!
    ): EventUpdateResponse!
  }

  scalar Date
`;
