const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my_secret_key",  
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: "./sessions" }), 
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

const USER = { username: "admin", password: "1234" };

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
      <h2>Welcome   ${req.session.user} ...!!</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h2>You are not logged in</h2>
      <a href="/login">Login</a>
    `);
  }
});

app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="username" required />
      <input type="password" name="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    req.session.user = username; 
    res.redirect("/");
  } else {
    res.send("<h3>Invalid credentials</h3><a href='/login'>Try again</a>");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("server running on http://localhost:3000"));
