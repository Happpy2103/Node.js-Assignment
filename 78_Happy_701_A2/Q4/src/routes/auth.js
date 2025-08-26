const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

router.get("/login", (req, res) => {
  if (req.session.admin) return res.redirect("/dashboard");
  res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.render("login", { error: "Invalid credentials" });

  const ok = await admin.comparePassword(password);
  if (!ok) return res.render("login", { error: "Invalid credentials" });

  req.session.admin = { id: admin._id, email: admin.email };
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
