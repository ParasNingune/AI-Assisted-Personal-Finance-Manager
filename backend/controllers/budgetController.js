const Budget = require("../models/Budget");

// Create budget
exports.createBudget = async (req, res) => {
    try {
        const { userId, category, monthlyLimit } = req.body;

        if (!userId || !category || !monthlyLimit) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const budget = await Budget.create({
            userId,
            category,
            monthlyLimit
        });

        res.status(201).json({
            success: true,
            message: "Budget created successfully",
            budget
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating budget",
            error: error.message
        });
    }
};

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const budgets = await Budget.find({ userId });

        res.status(200).json({
            success: true,
            budgets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching budgets",
            error: error.message
        });
    }
};

// Update budget
exports.updateBudget = async (req, res) => {
    try {
        const { userId, monthlyLimit } = req.body;

        if (!userId || !monthlyLimit) {
            return res.status(400).json({
                success: false,
                message: "userId and monthlyLimit are required"
            });
        }

        // Fixed update operation
        const budget = await Budget.findOne({ _id: req.params.id, userId });
        
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        budget.monthlyLimit = monthlyLimit;
        await budget.save();

        res.status(200).json({
            success: true,
            message: "Budget updated successfully",
            budget
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating budget",
            error: error.message
        });
    }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Budget deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting budget",
            error: error.message
        });
    }
};
