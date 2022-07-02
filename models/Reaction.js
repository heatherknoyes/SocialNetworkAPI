const { Schema, model } = require("mongoose");
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const reactionSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
