const { users } = require("../db/users.js");
const Model = require("../db/models/index.js");

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
  const gteFilter = {
    $gte: age,
  };

  const lteFilter = {
    $lte: age,
  };
  Model.find(
    {
      age: inputLessOrGreat === "G" ? { ...gteFilter } : { ...lteFilter },
    },
    (err, users) => {
      if (err) {
        console.error(`Failed to retrieve users, ${err}`);
        res.status(500).send(err);
        return;
      }
      res.send(users);
      return;
    }
  );
  /**
   * Deprecated
   */
  // const filteredUsers = users.filter((user) =>
  //   inputLessOrGreat === "G" ? user.age >= age : user.age < age
  // );
};

const createUser = (req, res) => {
  const { name, age } = req.body;
  /**
   * Deprecated
   */
  // users.push({
  //   name,
  //   age,
  // });

  // db insertion
  console.log(Model, "model");
  const Users = new Model({ name, age });
  Users.save()
    .then(() => {
      res.status(201).send("User created.");
    })
    .catch((err) => {
      res.status(500).send(`Failed to create user. ${err}`);
    });
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

const updateUser = (req, res) => {
  const { name } = req.query;
  const { ...properties } = req.body;
  Model.findOneAndUpdate(
    {
      name,
    },
    { ...properties },
    (err) => {
      if (err) {
        console.error(`I've failed you, ${err}`);
        res.status(500).send(err);
        return;
      }
      res.send("Updated user.");
      return;
    }
  );
};

module.exports = {
  getUsersByCriteria,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
