const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require('xlsx');
const fs = require("fs");
const path = require("path");

// Add Expense Source
exports.addExpense = async(req, res) => {
    const userId = req.user.id;

    try {
        const {icon, source, amount, date} = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch(err) {
        res.status(500).json({message: "Server Error", err});
    }
}

// Get all Expense Source
exports.getAllExpense = async(req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch(err) {
        res.status(500).json({message: "Server Error", err});
    }
}

// Delete Expense Source
exports.deleteExpense = async(req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted"});
    } catch(err) {
        res.status(500).json({message: "Server Error", err});
    }
}
exports.downloadReport = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const income = await Expense.find({ userId });
  
      // Format data for Excel
      const data = expense.map((item, index) => ({
        No: index + 1,
        Source: item.source,
        Amount: item.amount,
        Date: new Date(item.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      }));
  
      // Create worksheet and workbook
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
  
      xlsx.utils.book_append_sheet(wb, ws, 'Expense');
  
      // Define file path
      const filePath = path.join(__dirname, '../reports/expense_report.xlsx');
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      xlsx.writeFile(wb, filePath);
  
      // Send file for download
      res.download(filePath, 'expense_report.xlsx', (err) => {
        if (err) {
          console.error('Download error:', err);
          res.status(500).json({ message: 'Failed to download Excel' });
        }
      });
  
    } catch (err) {
      console.error('Error generating Excel:', err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
