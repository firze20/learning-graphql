const express = require("express");
const app = express();

// Get the Mongoose models for querying the database
const { User } = require("./models/models");

const PORT = 4000;

// Simple route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  // Find the user with the given ID
  User.findById(id, (err, user) => {
    if (err) {
      // The DB returned an error so we return a 500 error 
      res.status(500).send("Error querying the database");
    }

    if (!user) {
      res.status(404).send("User not found");
    }

    // Return the user to client automatically serialized as JSON
    res.send(user);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
