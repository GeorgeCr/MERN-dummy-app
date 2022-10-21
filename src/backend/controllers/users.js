const { users } = require("../db/users.js");

const getUsersByCriteria = (req, res) => {
  console.log("entering get all users controller");
  const { age, lessOrGreat } = req.query; // <number>, <L | G>
  const filters = ["L", "G"];
  const inputLessOrGreat = lessOrGreat.toUpperCase().trim();
  console.log(inputLessOrGreat);
  if (!filters.includes(inputLessOrGreat)) {
    res.status(401);
    res.send("INVALID FILTER TYPE");
    return;
  }
  console.log("query params", age, lessOrGreat);
  //   if (lessOrGreat === "G") {
  //   }
  //   if (lessOrGreat === "L") {
  //   }
  const filteredUsers = users.filter((user) =>
    inputLessOrGreat === "G" ? user.age >= age : user.age < age
  );
  res.send(filteredUsers);
  return;
};

const createUser = (req, res) => {
  const { id, name, age } = req.body;
  users.push({
    id,
    name,
    age,
  });
  res.status(201).send("User created.");
};

const getAllUsers = (_req, res) => {
  // res.set("content-type", "application/json");
  // res.send(users);
  // citesc din db
  // const dbUsers = find.db();
  // dbUsers.map(user => ({

  //   }))
  //   res.status(204).send();
  res.send({ users });
};

const getUserById = (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  // cauta in users, user-ul cu id-ul trimis ca parametru
  const userToFind = users.find((user) => user.id === +id);

  console.log(userToFind);
  res.json({ user: userToFind });
  // req.params.id // 2
};

module.exports = {
  getUsersByCriteria,
  createUser,
  getAllUsers,
  getUserById,
};
