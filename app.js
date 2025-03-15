const express = require("express");
const graphqlHTTP = require("graphql-http");

const app = express();

// Get the Mongoose models for querying the database
const { User } = require("./models/models");

const PORT = 4000;

// Simple route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the user with the given ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Send the user back as a response
    res.send(user);
  } catch (err) {
    // Log the error to the console
    console.error(err);
    res.status(500).send("An error occurred while trying to find the user");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
