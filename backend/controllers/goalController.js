const Goal = require("../models/Goal");

// Create goal
exports.createGoal = async (req, res) => {
    try {
        const { userId, goalName, goalAmount, targetDate } = req.body;

        if (!userId || !goalName || !goalAmount) {
            return res.status(400).json({
                success: false,
                message: "userId, goalName, and goalAmount are required"
            });
        }

        const goal = await Goal.create({
            userId,
            goalName,
            goalAmount,
            targetDate,
            savedAmount: 0
        });

        res.status(201).json({
            success: true,
            message: "Goal created successfully",
            goal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating goal",
            error: error.message
        });
    }
};

// Get all goals for a user
exports.getGoals = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const goals = await Goal.find({ userId });

        res.status(200).json({
            success: true,
            goals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching goals",
            error: error.message
        });
    }
};

// Update goal progress
exports.updateGoal = async (req, res) => {
    try {
        const { userId, savedAmount } = req.body;

        if (!userId || savedAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: "userId and savedAmount are required"
            });
        }

        const goal = await Goal.findOne({ _id: req.params.id, userId });
        
        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        goal.savedAmount = savedAmount;
        await goal.save();

        res.status(200).json({
            success: true,
            message: "Goal progress updated successfully",
            goal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating goal",
            error: error.message
        });
    }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Goal deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting goal",
            error: error.message
        });
    }
};
