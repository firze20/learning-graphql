const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { ruruHTML } = require("ruru/server");
const express = require("express");

const app = express();

// Get the Mongoose models for querying the database
const { User } = require("./models/models");

const PORT = 4000;

// Construct our GraphQL schema, using the GraphQL schema language
// This schema has two queries: user and users
// The user query takes an id argument and returns a single User
// The users query returns an array of all User objects
const schema = buildSchema(`
  type User {
    _id: String
    username: String
  }
  
  type Query {
    user(id: String): User 
    users: [User]
  }
`);

// Define resolvers
const rootValue = {
  // Resolver for single user
  async user({ id }) {
    return await User.findById(id);
  },
  // Resolver for all users
  async users() {
    return await User.find();
  }
};

//Serve the GraphiQL IDE
app.get('/', (req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// Start up a GraphQL endpoint listenning at /graphql
app.all("/graphql", createHandler({ 
  schema, 
  rootValue,
}));


// Start the application, listenning on port 4000
app.listen(PORT, () => {
  console.log(`GraphQL is running on http://localhost:${PORT}/graphql`);
});
