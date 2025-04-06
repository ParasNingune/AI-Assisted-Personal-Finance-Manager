const Investment = require("../models/Investment");

// Create new investment
exports.createInvestment = async (req, res) => {
    try {
        const {
            userId,
            type,
            name,
            symbol,
            quantity,
            buyPrice,
            currentPrice,
            investmentDate,
            isSIP,
            sipAmount,
            sipFrequency,
            nextSIPDate
        } = req.body;

        if (!userId || !type || !name || !symbol || !quantity || !buyPrice || !currentPrice) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        if (isSIP && (!sipAmount || !sipFrequency)) {
            return res.status(400).json({
                success: false,
                message: "SIP amount and frequency are required for SIP investments"
            });
        }

        const returns = (currentPrice - buyPrice) * quantity;

        const investment = await Investment.create({
            userId,
            type,
            name,
            symbol,
            quantity,
            buyPrice,
            currentPrice,
            investmentDate,
            isSIP,
            sipAmount,
            sipFrequency,
            nextSIPDate,
            returns
        });

        res.status(201).json({
            success: true,
            message: "Investment created successfully",
            investment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating investment",
            error: error.message
        });
    }
};

// Get all investments
exports.getInvestments = async (req, res) => {
    try {
        const { userId, type } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        let query = { userId };
        if (type) {
            query.type = type;
        }

        const investments = await Investment.find(query)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            investments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching investments",
            error: error.message
        });
    }
};

// Update investment
exports.updateInvestment = async (req, res) => {
    try {
        const {
            userId,
            currentPrice,
            quantity,
            sipAmount,
            sipFrequency,
            nextSIPDate
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const investment = await Investment.findOne({
            _id: req.params.id,
            userId
        });

        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment not found"
            });
        }

        if (currentPrice) investment.currentPrice = currentPrice;
        if (quantity) investment.quantity = quantity;
        if (sipAmount) investment.sipAmount = sipAmount;
        if (sipFrequency) investment.sipFrequency = sipFrequency;
        if (nextSIPDate) investment.nextSIPDate = nextSIPDate;

        investment.returns = (investment.currentPrice - investment.buyPrice) * investment.quantity;
        investment.updatedAt = Date.now();

        await investment.save();

        res.status(200).json({
            success: true,
            message: "Investment updated successfully",
            investment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating investment",
            error: error.message
        });
    }
};

// Delete investment
exports.deleteInvestment = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const investment = await Investment.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Investment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting investment",
            error: error.message
        });
    }
};