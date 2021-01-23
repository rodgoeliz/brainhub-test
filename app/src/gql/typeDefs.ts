import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Event {
    id: ID!
    name: String!
    lastName: String!
    email: String!
    eventDate: Date!
  }

  type EventUpdateResponse {
    success: Boolean!
    message: String!
    event: Event
  }
  input RegisterEventInput {
    name: String!
    lastName: String!
    email: String!
    eventDate: Date!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayLoad {
    token: String
    message: String
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    login(data: UserLoginInput!): AuthPayLoad!
    registerEvent(event: RegisterEventInput!): EventUpdateResponse!
  }

  scalar Date
`;
