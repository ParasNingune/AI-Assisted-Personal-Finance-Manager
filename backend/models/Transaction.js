const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  isRecurring: { type: Boolean, default: false },
  frequency: { type: String, enum: ["daily", "weekly", "monthly", "yearly"], required: function() { return this.isRecurring; } },
  nextDueDate: { type: Date },
  transactionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
