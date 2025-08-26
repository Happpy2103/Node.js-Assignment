const express = require("express");
const Employee = require("../models/Employee");
const { generateEmpId } = require("../utils/id");
const { generatePlainPassword, hashPassword } = require("../utils/password");
const createMailer = require("../config/mailer");
const { ensureAdmin } = require("../middleware/auth");

const router = express.Router();

// Protect all routes with admin authentication
router.use(ensureAdmin);

// ===== List all employees =====
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render("employees/index", { employees });
  } catch (err) {
    console.error(err);
    res.send("Error fetching employees");
  }
});

// ===== New employee form =====
router.get("/new", (req, res) => {
  res.render("employees/new", { employee: {}, errors: {} });
});

// ===== Create new employee =====
router.post("/new", async (req, res) => {
  try {
    const empId = await generateEmpId();
    const plainPassword = generatePlainPassword(10);
    const passwordHash = await hashPassword(plainPassword);

    const { name, email, phone, department, baseSalary, hraPercent, daPercent, deductions } = req.body;

    // Calculate net salary
    const netSalary =
      Number(baseSalary) +
      (Number(baseSalary) * Number(hraPercent) / 100) +
      (Number(baseSalary) * Number(daPercent) / 100) -
      Number(deductions);

    const employee = await Employee.create({
      empId,
      name,
      email,
      phone,
      department,
      baseSalary,
      hraPercent,
      daPercent,
      deductions,
      netSalary,
      passwordHash,
    });

    // Send email with credentials
    try {
      const transporter = createMailer();
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: employee.email,
        subject: `Welcome to ERP | Your Account Details (${employee.empId})`,
        html: `
          <p>Hi ${employee.name},</p>
          <p>Your employee account has been created.</p>
          <ul>
            <li><b>Employee ID:</b> ${employee.empId}</li>
            <li><b>Temporary Password:</b> ${plainPassword}</li>
          </ul>
          <p>Please log in and change your password immediately.</p>
          <p>Thanks,<br/>ERP Admin</p>
        `,
      });
      console.log(`📧 Email sent to ${employee.email}`);
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
    }

    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err);
    res.render("employees/new", { employee: req.body, errors: { general: "Failed to create employee" } });
  }
});

// ===== Show employee details =====
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.redirect("/admin/employees");
    res.render("employees/show", { employee });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/employees");
  }
});

// ===== Edit employee form =====
router.get("/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.redirect("/admin/employees");
    res.render("employees/edit", { employee, errors: {} });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/employees");
  }
});

// ===== Update employee =====
router.post("/:id/edit", async (req, res) => {
  try {
    const { name, email, phone, department, baseSalary, hraPercent, daPercent, deductions } = req.body;

    const netSalary =
      Number(baseSalary) +
      (Number(baseSalary) * Number(hraPercent) / 100) +
      (Number(baseSalary) * Number(daPercent) / 100) -
      Number(deductions);

    await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phone,
      department,
      baseSalary,
      hraPercent,
      daPercent,
      deductions,
      netSalary,
    });

    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err);
    const employee = await Employee.findById(req.params.id);
    res.render("employees/edit", { employee, errors: { general: "Failed to update employee" } });
  }
});

// ===== Delete employee =====
router.post("/:id/delete", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/employees");
  }
});

module.exports = router;
