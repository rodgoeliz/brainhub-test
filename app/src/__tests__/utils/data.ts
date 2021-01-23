import { AuthenticationError } from "apollo-server-express";
import { Event as EventType } from "../../generated/graphql";

export const mockUser = {
  id: "someId",
  email: "some@email",
  name: "someName",
  lastName: "someLastName",
  password: "somePassword",
};

export const mockContext = {
  dataSources: {
    users: {
      login: jest.fn(),
    },
    events: {
      getAllEvents: jest.fn(),
      registerEvent: jest.fn(),
    },
  },
  user: { iat: 12345, exp: 12345, userId: mockUser.id },
};

export const mockEvent: EventType = {
  id: "someId",
  name: mockUser.name,
  lastName: mockUser.lastName,
  email: mockUser.email,
  eventDate: new Date("30-08-1991"),
};

export const mockAuthenticationError = new AuthenticationError(
  "must authenticate"
);
