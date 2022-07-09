const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUsername, getRandomEmail } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    // const thoughts = getRandomThoughts(20);

    const username = getRandomUsername();
    const email = getRandomEmail();

    if (
      users.filter((e) => e.username === username).length === 0 &&
      users.filter((e) => e.email === email).length === 0
    ) {
      users.push({
        username: username,
        email: email,
      });
    }
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  for (let i = 0; i < 5; i++) {
    // Add courses to the collection and await the results
    await Thought.collection.insertOne({
      thoughtText: `Test-${i}`,
      username: getRandomUsername(),
    });
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
