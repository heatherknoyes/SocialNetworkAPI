// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// TODO: Create an aggregate function to get the number of students overall
// const headCount = async () =>
//   Student.aggregate()
//     .count("studentCount")
//     // Student.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
//     // Your code here
//     .then((numberOfStudents) => numberOfStudents);

// Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator
// const grade = async (studentId) =>
//   Student.aggregate([
//     // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
//     {
//       // Your code here
//       $match: { _id: ObjectId(studentId) },
//     },
//     {
//       $unwind: "$assignments",
//     },
//     // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
//     {
//       // Your code here
//       $group: {
//         _id: ObjectId(studentId),
//         overallGrade: { $avg: "$assignments.score" },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateSingleUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the site
  async deleteSingleUser(req, res) {
    try {
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });
      if (removedUser) {
        const removedThoughts = await Thought.deleteMany({
          _id: removedUser.thoughts,
        });
        res
          .status(200)
          .json({ message: "Removed user and associated thoughts" });
      } else {
        res.status(404).json({ message: "No such user exists" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  // Add a friend to the user
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
