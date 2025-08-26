const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

AdminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
