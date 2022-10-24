const multer = require("multer");
const bcrypt = require("bcrypt");
const {
  getUsersByCriteria,
  createUser,
  getAllUsers,
  getUserById,
  updateUser
} = require("../controllers/users.js");
const { isAuth } = require("../middlewares/index.js");

console.log(isAuth);

const upload = multer({
  dest: "./src/backend/resources",
  filename: "some_file_name_yes",
});

module.exports = (app) => {
  app.get("/users", getUsersByCriteria);

  app.post("/users", createUser);

  app.get("/users", getAllUsers);

  app.get("/users/:id", getUserById);

  app.patch("/users", updateUser);

  app.post("/files", upload.single("uploaded_file"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send("Uploaded the file");
    return;
  });

  app.post("/authenticate", (req, res) => {
    console.log(`email: ${req.body.email}, password: ${req.body.password}`);
    const { email, password } = req.body;
    // salting below
    bcrypt.genSalt(3, (err, salt) => {
      if (err) {
        console.log("salt err", err);
        res.status(500).send("Error when salting....");
        return;
      }
      console.log(salt," salt here");
      // hashing below
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log("hasing err", err);
          res.status(500).send("Error when hashing....");
          return;
        }
        console.log(`hashed yayy, ${hash}`);
        return;
      });
      req.session.isAuthenticated = true;
      res.send("Authenticated");
      return;
    });
  });
};
