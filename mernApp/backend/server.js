const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const User = require("./Models/userModel");

app.use(express.json());
app.use(cors())

mongoose
  .connect(process.env.URI)
  .then(() =>
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log("err", err);
      console.log("successfully connected");
    })
  )
  .catch((err) => console.log(err));

app.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userData = await User.create({
      name,
      email,
      age,
    });
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all users

app.get("/", async (req, res) => {
  try {
    const getData = await User.find();
    res.status(200).json(getData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get single user

app.get("/:id", async (req, res) => {
    const {id} = req.params
    try{
        let getData = await User.findById({_id:id});
        res.status(200).json(getData);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
});

// delete user

app.delete("/:id", async (req, res) => {
    const {id} = req.params
    try{
        let getData = await User.findByIdAndDelete({_id:id});
        res.status(200).json(getData);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
});

// patch user

app.patch("/:id", async (req, res) => {
    const {id} = req.params
    try{
        let updateData = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateData);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
  res.send("app running");
});

// app.use('api/users',userRoute);
app.use(userRoute);
