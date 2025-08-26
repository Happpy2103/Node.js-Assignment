const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/downloads", express.static("downloads"));
app.use(bodyParser.urlencoded({ extended: false }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


app.get("/", (req, res) => {
  res.render("form", { errors: {}, old: {} });
});

app.post(
  "/register",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "otherPics", maxCount: 5 },
  ]),
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    body("confirmPassword").custom((val, { req }) => {
      if (val !== req.body.password) throw new Error("Passwords do not match");
      return true;
    }),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("hobbies").notEmpty().withMessage("Select at least one hobby"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("form", { errors: errors.mapped(), old: req.body });
    }

    const userData = {
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      hobbies: Array.isArray(req.body.hobbies) ? req.body.hobbies.join(", ") : req.body.hobbies,
      profilePic: req.files["profilePic"] ? req.files["profilePic"][0].filename : null,
      otherPics: req.files["otherPics"] ? req.files["otherPics"].map(f => f.filename) : [],
    };

  
    const pdfPath = `downloads/${userData.username}-details.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(18).text("User Registration Details", { align: "center" }).moveDown();
    doc.fontSize(12).text(`Username: ${userData.username}`);
    doc.text(`Email: ${userData.email}`);
    doc.text(`Gender: ${userData.gender}`);
    doc.text(`Hobbies: ${userData.hobbies}`);
    doc.end();

    res.render("success", { data: userData, pdfFile: pdfPath });
  }
);


app.get("/download/:file", (req, res) => {
  const filePath = path.join(__dirname, "downloads", req.params.file);
  res.download(filePath, err => {
    if (err) res.status(500).send("File not found");
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
