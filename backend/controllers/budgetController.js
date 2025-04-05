const Budget = require("../models/Budget");

exports.addBudget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.params.userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
