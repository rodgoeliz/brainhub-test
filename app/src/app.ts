/* eslint-disable no-console */
require("dotenv").config();

import { makeExecutableSchema, ApolloServer } from "apollo-server-express";
import express from "express";
import { ExecutionResult } from "graphql";
import useSofa from "sofa-api";

import Events from "./datasources/Events";
import { client } from "./drivers/mongoDb";
import { resolvers } from "./gql/resolvers";
import { typeDefs } from "./gql/typeDefs";

// MONGO DB CONNECT
client.connect(async (err) => (err ? console.error(err.message) : null));

// APP EXPRESS
const app = express();

// APOLLO GRAPHQL API
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  dataSources: () => ({ events: new Events(client.db().collection("events")) }),
});
apolloServer.applyMiddleware({ app });

// REST API
const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use(
  "/api/v1",
  useSofa({
    schema,
    execute: ({ source, variableValues, operationName }) =>
      (apolloServer.executeOperation({
        query: source.toString(),
        variables: variableValues || {},
        operationName: operationName || "",
      }) as unknown) as Promise<ExecutionResult<unknown>>,
  })
);

app.listen({ port: 4000 }, () => {
  console.log("Now browse to http://localhost:4000/api/v1");
  console.log("Now browse to http://localhost:4000" + apolloServer.graphqlPath);
});
