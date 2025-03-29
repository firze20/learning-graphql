import { Schema } from 'mongoose';

// Create a Group schema to be stored in the MongoDB database
const GroupSchema = new Schema({
    _id: String,
    name: String
});

export default GroupSchema;

