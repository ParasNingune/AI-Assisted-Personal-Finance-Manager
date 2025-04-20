const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: {userId: userObjectId}},
            { $group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        console.log("Total Income: ", totalIncome);

        const totalExpense = await Expense.aggregate([
            { $match: {userId: userObjectId}},
            { $group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        console.log("Total Expense: ", totalExpense);

        // Last 30 days income
        const last30incomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});

        // Total Income last 30 days
        const last30income = last30incomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Last 30 days expense
        const last30expenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});

        // Total Expense last 30 days
        const last30expense = last30expenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Recent transactions (income+expense)
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date:-1}).limit(15)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),

            ...(await ( Expense.find({userId}).sort({date:-1}).limit(15))).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )
        ].sort((a,b) => b.date - a.date);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpenses: totalExpense[0]?.total || 0,
                last30Expenses: {
                    total: last30expense,
                    transactions: last30expenseTransactions,
                },
                last30Income: {
                    total: last30income,
                    transactions: last30incomeTransactions,
                },
                recentTransactions: lastTransactions,
        });
    } catch (err) {
        res.status(500).json({message: "Server Error", err});
    }
}