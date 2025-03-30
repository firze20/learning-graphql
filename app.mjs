import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {typeDefs, resolvers} from "../app/graphql/index.js";
import express from "express";
import { createServer } from "http";
import cors from "cors";

const PORT = 4000;


const app = express();
const httpServer = createServer(app);

// Set up Apollo Server

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server)
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
