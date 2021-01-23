/* eslint-disable no-console */
require("dotenv").config();

// LIBS
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import express from "express";

// ServerFiles
import { UsersAPI } from "./datasources/UsersAPI";
import { EventsAPI } from "./datasources/EventsAPI";
import { client } from "./drivers/mongoDb";
import { resolvers } from "./gql/resolvers";
import { typeDefs } from "./gql/typeDefs";
import { decodedToken } from "./auth/UserAuth";

client.connect(async (err) => (err ? console.error(err.message) : null));

const app = express();
app.use(
  cors({
    origin: process.env.REACT_APP_ENDPOINT,
    credentials: true,
  })
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  dataSources: () => ({
    users: new UsersAPI(client.db().collection("users")),
    events: new EventsAPI(client.db().collection("events")),
  }),
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = decodedToken(token);
    return { user };
  },
});
apolloServer.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () => {
  console.log("🚀 🚀 🚀  http://localhost:4000" + apolloServer.graphqlPath);
});
