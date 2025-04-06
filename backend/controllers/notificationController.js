const Notification = require("../models/Notification");

// Create notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, message, dueDate } = req.body;

        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: "userId and message are required"
            });
        }

        const notification = await Notification.create({
            userId,
            message,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating notification",
            error: error.message
        });
    }
};

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 }); // Most recent first

        res.status(200).json({
            success: true,
            notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching notifications",
            error: error.message
        });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId },
            { status: "read" },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating notification",
            error: error.message
        });
    }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting notification",
            error: error.message
        });
    }
};
