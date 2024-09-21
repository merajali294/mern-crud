const express = require("express");
const User = require("../Models/userModel");
const router = express.Router();
// app.use(express.json());

// app.post("/", async (req, res) => {
//   const { name, email, age } = req.body;
//   try {
//     const userData = await User.create({
//       name,
//       email,
//       age,
//     });
//     res.status(201).json(userData);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/", async (req, res) => {
//   try {
//     const getData = await User.find();
//     res.status(200).json(getData);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router