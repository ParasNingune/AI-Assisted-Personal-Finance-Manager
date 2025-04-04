const { db } = require("../config/firebaseConfig");

exports.addTransaction = async (req, res) => {
  try {
    const { userId, accountId, type, category, amount, description } = req.body;

    const transactionRef = db.collection("transactions").doc();
    await transactionRef.set({
      transactionId: transactionRef.id,
      userId,
      accountId,
      type,
      category,
      amount,
      description,
      transactionDate: new Date(),
    });

    res.status(201).json({ message: "Transaction added", transactionId: transactionRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
