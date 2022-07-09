const usernames = [
  "heatherknoyes",
  "coocoocuzco",
  "aryaparty",
  "alexzickar",
  "avidoggo",
];

const emails = [
  "emailOne@gmail.com",
  "randoEmail@gmail.com",
  "wackyExample@yahoomail.com",
  "fireplace123@aol.com",
  "coocookachoo@group.com",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => `${getRandomArrItem(usernames)}`;

const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomEmail };
