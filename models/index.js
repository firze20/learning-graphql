const mongoose = require('mongoose');
// Schemas to be turned into models
const UserSchema = require('./user.model');
const GroupSchema = require('./group.model');

mongoose.connect('mongodb://graphql_mongo:27017/guide');

const User = mongoose.model('User', UserSchema);
const Group = mongoose.model('Group', GroupSchema);

module.exports = { User, Group };
