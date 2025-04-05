const Account = require("../models/Account");

// Create new account
exports.createAccount = async (req, res) => {
    try {
        const { userId, bankName, accountType, initialBalance } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const account = await Account.create({
            userId,
            bankName,
            accountType,
            initialBalance,
            currentBalance: initialBalance
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            account
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating account",
            error: error.message
        });
    }
};

// Get all accounts for a user
exports.getAccounts = async (req, res) => {
    try {
        const { userId } = req.query;  // Get userId from query parameters

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const accounts = await Account.find({ userId: userId });
        
        if (!accounts.length) {
            return res.status(200).json({
                success: true,
                message: "No accounts found for this user",
                accounts: []
            });
        }

        res.status(200).json({
            success: true,
            accounts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching accounts",
            error: error.message
        });
    }
};


// Delete account
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting account",
            error: error.message
        });
    }
};
