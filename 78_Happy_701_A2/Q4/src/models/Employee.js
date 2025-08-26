const mongoose = require("mongoose");
const { computeNetSalary } = require("../utils/salary");

const EmployeeSchema = new mongoose.Schema(
  {
    empId: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    department: { type: String },

    baseSalary: { type: Number, default: 0 },
    hraPercent: { type: Number, default: 0 },
    daPercent: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },

    passwordHash: { type: String, required: true }, // encrypted (hashed)
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

EmployeeSchema.virtual("netSalary").get(function () {
  return computeNetSalary({
    base: this.baseSalary,
    hraPercent: this.hraPercent,
    daPercent: this.daPercent,
    deductions: this.deductions,
  });
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
