const express = require('express');
const app = express();

const PORT = 4000;

// Simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});