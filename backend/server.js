const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("\nConnected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
