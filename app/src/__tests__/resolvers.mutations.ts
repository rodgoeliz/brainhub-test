import {
  AuthPayLoad,
  MutationLoginArgs,
  MutationRegisterEventArgs,
  EventUpdateResponse,
} from "../generated/graphql";
import { resolvers } from "../gql/resolvers";
import {
  mockAuthenticationError,
  mockUser,
  mockContext,
  mockEvent,
} from "./utils/data";

describe("[Mutation.login]", () => {
  const validToken = "someToken";
  const loginResponseValid: AuthPayLoad = {
    token: validToken,
    message: "Success",
  };
  const loginResponseFail: AuthPayLoad = { token: null, message: "Fail" };
  const loginArgs: MutationLoginArgs = {
    data: { email: mockUser.email, password: mockUser.password },
  };
  const { login } = mockContext.dataSources.users;

  it("returns token and success message if successful", async () => {
    login.mockReturnValueOnce(loginResponseValid.token);

    const res = await resolvers.Mutation.login(null, loginArgs, mockContext);

    expect(res).toEqual(loginResponseValid);
    expect(login).toBeCalledWith(loginArgs.data.email, loginArgs.data.password);
  });

  it("returns null token and fail message if login fails", async () => {
    login.mockReturnValueOnce(loginResponseFail.token);

    const res = await resolvers.Mutation.login(null, loginArgs, mockContext);

    expect(login).toBeCalledWith(loginArgs.data.email, loginArgs.data.password);
    expect(res).toEqual(loginResponseFail);
  });
});

describe("[Mutation.registerEvent]", () => {
  const { registerEvent } = mockContext.dataSources.events;
  const registerEventArgs: MutationRegisterEventArgs = {
    event: {
      name: mockUser.name,
      lastName: mockUser.lastName,
      email: mockUser.email,
      eventDate: mockEvent.eventDate,
    },
  };
  const registerValidResponse: EventUpdateResponse = {
    event: mockEvent,
    message: "Success",
    success: true,
  };
  const registerInvalidResponse: EventUpdateResponse = {
    event: null,
    message: "Fail",
    success: false,
  };

  describe("Valid authentication", () => {
    it("the datasource is called with proper params", async () => {
      registerEvent.mockReturnValueOnce(mockEvent);
      await resolvers.Mutation.registerEvent(
        null,
        registerEventArgs,
        mockContext
      );

      expect(registerEvent).toBeCalledWith(registerEventArgs);
    });

    describe("Event creation Success", () => {
      it("returns a valid success response ", async () => {
        registerEvent.mockReturnValueOnce(mockEvent);

        const res = await resolvers.Mutation.registerEvent(
          null,
          registerEventArgs,
          mockContext
        );

        expect(res).toEqual(registerValidResponse);
      });
    });
    describe("Event creation Fails", () => {
      it("returns a valid fail response ", async () => {
        registerEvent.mockReturnValueOnce(null);
        const res = await resolvers.Mutation.registerEvent(
          null,
          registerEventArgs,
          mockContext
        );
        expect(res).toEqual(registerInvalidResponse);
      });
    });
  });

  describe("Invalid authenticated", () => {
    it("returns an authentication error", async () => {
      const executeRegisterEvent = () =>
        resolvers.Mutation.registerEvent(null, registerEventArgs, {
          ...mockContext,
          user: undefined,
        });

      expect(
        await expect(executeRegisterEvent()).rejects.toThrow(
          mockAuthenticationError
        )
      ).toBeUndefined;

      registerEvent.mockReturnValueOnce(mockEvent);
      expect(
        await expect(executeRegisterEvent()).rejects.toThrow(
          mockAuthenticationError
        )
      ).toBeUndefined;
    });
  });
});
