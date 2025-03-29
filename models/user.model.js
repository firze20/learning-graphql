import { Schema } from 'mongoose';

// Create a User schema to be stored in the MongoDB database
const UserSchema = new Schema({
    _id: String,
    username: String,
    groupId: String
});

export default UserSchema;

