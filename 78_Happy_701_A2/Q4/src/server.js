require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const { ensureAdmin } = require("./middleware/auth");
const bcrypt = require("bcryptjs");

const app = express();

connectDB(process.env.MONGO_URI);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, 
    },
  })
);


app.use((req, res, next) => {
  res.locals.adminEmail = req.session?.admin?.email || null;
  next();
});


async function ensureDefaultAdmin() {
  const email = "admin@gmail.com";
  const found = await Admin.findOne({ email });
  if (!found) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);
    await Admin.create({ email, passwordHash });
    console.log(" Default admin created -> email: admin@gmail.com | pass: Admin@123");
  }
}
ensureDefaultAdmin().catch(console.error);

app.use(authRoutes);
app.get("/dashboard", ensureAdmin, (req, res) => res.render("dashboard"));
app.use("/admin/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
