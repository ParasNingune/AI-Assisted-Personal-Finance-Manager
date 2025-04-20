const express = require('express');
const router = express.Router();
const { generateResponse, startChat } = require('../controllers/geminiController');

// Start a new chat session
router.post('/start', async (req, res) => {
    try {
        const chat = await startChat();
        res.json({ success: true, message: 'Chat session started' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Generate response for user message
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await generateResponse(message);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;