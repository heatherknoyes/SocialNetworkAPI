const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [thoughtSchema._id],
    friends: [this._id],
    // need to add a virtual here for friendCount that gets the length of the field above
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
