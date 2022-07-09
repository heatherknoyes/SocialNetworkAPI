const { Thought, User } = require("../models");

//   deleteReaction,

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(async (thought) => {
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } },
          { runValidators: true, new: true }
        );
        user.save();
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteSingleThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        // need to delete from user as well
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { username: thought.username },
              {
                $pull: { thoughts: thought._id },
              }
            )
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        thought.save();
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    )
      .then((thought) => {
        // need to delete from user as well
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
        }
      })
      .then(() => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
