const { db } = require("../config/firebaseConfig");

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userRef = db.collection("users").doc();
    await userRef.set({ userId: userRef.id, name, email, createdAt: new Date() });

    res.status(201).json({ message: "User created successfully", userId: userRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
