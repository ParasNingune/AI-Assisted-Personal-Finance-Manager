const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
// const accountRoutes = require("./routes/accountRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const budgetRoutes = require("./routes/budgetRoutes");
// const goalRoutes = require("./routes/goalRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const investmentRoutes = require("./routes/investmentRoutes");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/accounts", accountRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/budgets", budgetRoutes);
// app.use("/api/goals", goalRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/investments", investmentRoutes);

app.get("/test", (req, res) => {
    res.status(200).json({ message: "API working!" });
});

module.exports = app;
