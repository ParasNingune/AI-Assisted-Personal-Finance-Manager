const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const txn = await Transaction.create(req.body);
    res.status(201).json(txn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find({ userId: req.params.userId }).sort({ transactionDate: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
