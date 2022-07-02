const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 200,
    },
    createdAt: {
      type: Date,
      required: true,
      // set default value
      // getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],

    // need to add a virtual here for reactionCount that gets the length of the field above
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
