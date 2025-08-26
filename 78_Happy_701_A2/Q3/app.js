const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Views setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

// Session setup (memory store)
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Dummy user
const USER = { username: "admin", password: "123456" };

// Middleware to protect routes
function ensureAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

// Routes
app.get("/", (req, res) => res.redirect("/dashboard"));

app.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("login", { error: "" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    req.session.user = { username };
    return res.redirect("/dashboard");
  }

  res.render("login", { error: "Invalid username or password" });
});

app.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

// Server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
