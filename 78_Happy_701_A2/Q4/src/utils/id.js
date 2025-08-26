const Employee = require("../models/Employee");

async function generateEmpId() {
  const last = await Employee.findOne().sort({ createdAt: -1 }).select("empId");
  let nextNum = 1;
  if (last?.empId) {
    const n = parseInt(last.empId.replace(/\D/g, ""), 10);
    nextNum = isNaN(n) ? 1 : n + 1;
  }
  return "EMP" + String(nextNum).padStart(4, "0");
}

module.exports = { generateEmpId };
