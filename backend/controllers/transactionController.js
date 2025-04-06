const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { 
            userId, 
            accountId, 
            type, 
            category, 
            amount, 
            description,
            isRecurring,
            frequency,
            nextDueDate 
        } = req.body;

        if (!userId || !accountId || !type || !category || !amount) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        if (isRecurring && !frequency) {
            return res.status(400).json({
                success: false,
                message: "Frequency is required for recurring transactions"
            });
        }

        const account = await Account.findOne({ _id: accountId, userId });
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        const newBalance = type === "income" 
            ? account.currentBalance + amount 
            : account.currentBalance - amount;

        const transaction = await Transaction.create({
            userId,
            accountId,
            type,
            category,
            amount,
            description,
            isRecurring,
            frequency,
            nextDueDate
        });

        account.currentBalance = newBalance;
        await account.save();

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            transaction,
            newBalance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating transaction",
            error: error.message
        });
    }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId;
        const isRecurring = req.query.isRecurring || req.body.isRecurring;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        let query = { userId };
        if (isRecurring !== undefined) {
            query.isRecurring = isRecurring === 'true';
        }

        const transactions = await Transaction.find(query)
            .sort({ transactionDate: -1 })
            .populate('accountId', 'bankName accountType');

        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching transactions",
            error: error.message
        });
    }
};

// Get transactions related to specific account
exports.getAccountTransactions = async (req, res) => {
    try {
        const { userId } = req.body;
        const accountId = req.params.accountId;
        const { isRecurring } = req.query;

        if (!userId || !accountId) {
            return res.status(400).json({
                success: false,
                message: "userId and accountId are required"
            });
        }

        let query = { userId, accountId };
        if (isRecurring !== undefined) {
            query.isRecurring = isRecurring === 'true';
        }

        const transactions = await Transaction.find(query)
            .sort({ transactionDate: -1 });

        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching account transactions",
            error: error.message
        });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        const account = await Account.findById(transaction.accountId);
        if (account) {
            account.currentBalance = transaction.type === "income"
                ? account.currentBalance - transaction.amount
                : account.currentBalance + transaction.amount;
            await account.save();
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting transaction",
            error: error.message
        });
    }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
    try {
        const { userId, amount, category, description, isRecurring, frequency, nextDueDate } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        // Update account balance if amount changed
        if (amount && amount !== transaction.amount) {
            const account = await Account.findById(transaction.accountId);
            if (account) {
                // Reverse the old transaction
                account.currentBalance = transaction.type === "income"
                    ? account.currentBalance - transaction.amount
                    : account.currentBalance + transaction.amount;
                
                // Apply the new transaction
                account.currentBalance = transaction.type === "income"
                    ? account.currentBalance + amount
                    : account.currentBalance - amount;
                
                await account.save();
            }
        }

        // Update transaction fields
        if (amount) transaction.amount = amount;
        if (category) transaction.category = category;
        if (description) transaction.description = description;
        if (isRecurring !== undefined) transaction.isRecurring = isRecurring;
        if (frequency) transaction.frequency = frequency;
        if (nextDueDate) transaction.nextDueDate = nextDueDate;

        await transaction.save();

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating transaction",
            error: error.message
        });
    }
};
