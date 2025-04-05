const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.params.userId });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
