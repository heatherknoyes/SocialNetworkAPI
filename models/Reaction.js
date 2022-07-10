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
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function formatDate(date) {
  const stringDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return stringDate;
}

module.exports = reactionSchema;
