function computeNetSalary({ base, hraPercent = 0, daPercent = 0, deductions = 0 }) {
  const hra = (Number(hraPercent) / 100) * Number(base || 0);
  const da  = (Number(daPercent) / 100) * Number(base || 0);
  const gross = Number(base || 0) + hra + da;
  return Math.max(0, gross - Number(deductions || 0));
}

module.exports = { computeNetSalary };
