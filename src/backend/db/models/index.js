const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: String,
  age: Number,
});

const UsersModel = mongoose.model("User", UsersSchema);

module.exports = UsersModel;
