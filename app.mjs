import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { createServer } from "http";
import cors from "cors";


// Get the Mongoose models for querying the database
import models from "./models/index.js";

const {User, Group} = models;

const PORT = 4000;

// Construct our GraphQL schema, using the GraphQL schema language
// This schema has two queries: user and users
// The user query takes an id argument and returns a single User
// The users query returns an array of all User objects
// Define schema
const typeDefs = `#graphql
  type Group {
    _id: String
    name: String
  }

  type User {
    _id: String
    username: String
    group: Group
  }

  type Query {
    user(id: String): User
    users: [User]
    group(id: String!): Group
    groups: [Group]
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    async user(_, { id }) {
      return await User.findById(id);
    },
    async users() {
      return await User.find();
    },
    async group(_, { id }) {
      return await Group.findById(id);
    },
    async groups() {
      return await Group.find();
    }
  },
  User: {
    async group(user) {
      return await user.group();
    }
  },

};

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
