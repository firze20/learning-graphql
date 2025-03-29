const mongoose = require('mongoose');

// Create a Group schema to be stored in the MongoDB database
const GroupSchema = new mongoose.Schema({
    _id: String,
    name: String
});

module.exports = GroupSchema;

