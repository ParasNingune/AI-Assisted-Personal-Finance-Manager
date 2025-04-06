const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { 
        type: String, 
        enum: ["stocks", "mutualFunds", "sip", "bonds", "etf"], 
        required: true 
    },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    investmentDate: { type: Date, default: Date.now },
    isSIP: { type: Boolean, default: false },
    sipAmount: { type: Number },
    sipFrequency: { 
        type: String, 
        enum: ["monthly", "quarterly", "yearly"],
        required: function() { return this.isSIP; }
    },
    nextSIPDate: { type: Date },
    returns: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Investment", investmentSchema);