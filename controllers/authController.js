const User = require("../models/User");
const jwt = require("../utils/jwt");

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Incomplete registration data" });
    }

    try {
      // console.log("Registration Data:", { email, password }); // Log registration data

      const newUser = await User.create({ email, password });
      const token = jwt.generateToken(newUser._id);
      res.json({ token });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Incomplete login data" });
    }

    try {
      // console.log("Login Data:", { email, password }); // Log login data

      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.generateToken(user._id);
      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
