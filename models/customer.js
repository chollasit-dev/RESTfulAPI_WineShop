const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const schema = new Schema(
  {
    FirstName: { type: String, require: true, trim: true },
    LastName: { type: String, require: true, trim: true },
    City: { type: String, require: true, trim: true },
    Phone: { type: String, require: true, trim: true },
    Email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 5,
      default: "password",
    },
    role: { type: String, default: "member" },
  },
  { collection: "Customer" }
);

schema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(5);
  const hasPassword = await bcrypt.hash(password, salt);
  return hasPassword;
};

schema.methods.checkPassword = async function (password) {
  const isvaild = await bcrypt.compare(password, this.password);
  return isvaild;
};

const customer = mongoose.model("Customer", schema);

module.exports = customer;
