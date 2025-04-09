const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password"
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { username },
        { phone: phone || null }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email, username, or phone"
      });
    }

    // Create new user with hashed password
    const user = await User.create({
      name, 
      username,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error creating user",
      error: err.message 
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log(identifier)
    console.log(password);

    // Check if identifier is provided
    if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide login credentials'
        });
    }

    // Find user by email or phone or username
    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier },
            { username: identifier }
        ]
    });
    console.log(user)

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    console.log(user.password);

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
        }
    });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;
    const userId = req.params.id;

    // Find user and update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (age) user.age = age;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        age: user.age,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};