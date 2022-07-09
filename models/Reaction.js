const { Schema } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

// Schema to create reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: new ObjectId(),
      max_length: 50,
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // use a getter method to format timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
