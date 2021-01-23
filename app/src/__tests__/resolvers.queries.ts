import { resolvers } from "../gql/resolvers";
import { mockAuthenticationError, mockContext, mockEvent } from "./utils/data";

describe("[Queries.events]", () => {
  const { getAllEvents } = mockContext.dataSources.events;

  describe("Valid authentication", () => {
    it("the datasource is called with proper params", async () => {
      getAllEvents.mockReturnValueOnce([mockEvent]);
      await resolvers.Query.events(null, null, mockContext);

      expect(getAllEvents).toBeCalled();
    });

    describe("There are events for that user", () => {
      it("returns a list of events ", async () => {
        getAllEvents.mockReturnValueOnce([mockEvent]);

        const res = await resolvers.Query.events(null, null, mockContext);

        expect(res).toEqual([mockEvent]);
      });
    });
    describe("There aren't events for that user", () => {
      it("returns a valid fail response ", async () => {
        getAllEvents.mockReturnValueOnce([]);

        const res = await resolvers.Query.events(null, null, mockContext);

        expect(res).toEqual([]);
      });
    });
  });

  describe("Invalid authenticated", () => {
    it("returns an authentication error", async () => {
      const executeRegisterEvent = () =>
        resolvers.Query.events(null, null, { ...mockContext, user: undefined });

      expect(
        await expect(executeRegisterEvent()).rejects.toThrow(
          mockAuthenticationError
        )
      ).toBeUndefined;
    });
  });
});
