const geminiModel = require('../config/gemini');

async function generateResponse(prompt) {
    try {
      const result = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 1000, // Roughly allows ~400 words
          temperature: 0.7,
          topP: 0.9,
        },
      })
      const response = await result.response;
      const text = response.text();
      
      const formattedText = text
        .split('\n')
        .map(line => {

          if (line.match(/^[IVX]+\./)) {
            return `\n**${line.trim()}**\n`;
          }

          else if (line.match(/^[A-Z][a-z]+:/)) {
            return `\n### ${line.trim()}\n`;
          }

          else if (line.trim().startsWith('•')) {
            return `• ${line.replace(/^[•*]\s*/, '').trim()}`;
          }

          else if (line.trim().startsWith('Why:')) {
            return `**Why:** ${line.replace('Why:', '').trim()}`;
          }
          else if (line.trim().startsWith('How:')) {
            return `**How:** ${line.replace('How:', '').trim()}\n`;
          }
          return line.trim();
        })
        .filter(line => line) // Remove empty lines
        .join('\n');
      return formattedText;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
}
  
async function startChat() {
    try {
      const chat = geminiModel.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });
      return chat;
    } catch (error) {
      console.error('Error starting chat:', error);
      throw error;
    }
  }
  
module.exports = {
    generateResponse,
    startChat,
};