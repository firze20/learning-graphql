import { connect, model } from 'mongoose';
// Schemas to be turned into models
import UserSchema from './user.model.js';
import GroupSchema from './group.model.js';

connect('mongodb://graphql_mongo:27017/guide');

const Group = model('Group', GroupSchema);

// Retrieve the group associated with the user
UserSchema.methods.group = function() {
    // Use .exec() to ensure a true Promise is returned
    return Group.findById(this.groupId).exec();
}

const User = model('User', UserSchema);


export default { User, Group };
