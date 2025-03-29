const mongoose = require('mongoose');

// Create a User schema to be stored in the MongoDB database
const UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
});

module.exports = UserSchema;

