const mongoose = require('mongoose');
// Schemas to be turned into models
const UserSchema = require('./user.model');
const GroupSchema = require('./group.model');

mongoose.connect('mongodb://graphql_mongo:27017/guide');

const Group = mongoose.model('Group', GroupSchema);

// Retrieve the group associated with the user
UserSchema.methods.group = function() {
    // Use .exec() to ensure a true Promise is returned
    return Group.findById(this.groupId).exec();
}

const User = mongoose.model('User', UserSchema);


module.exports = { User, Group };
