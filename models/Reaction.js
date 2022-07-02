const { Schema, model } = require("mongoose");
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId(),
      // default set to a new ObjectId
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
      // set default to the current timestamp
      // use a getter method to format timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
