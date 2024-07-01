require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.cjs");
const jwt = require("jsonwebtoken");

const workoutRoutes=require('../backend/routes/workout_routes.cjs')

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = "mongodb+srv://nik:1234@cluster0.lpymyoj.mongodb.net/node-auth";
// const dbUR = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000, () => console.log("Server listening on port 3000"));
  })
  .catch((err) => console.log(err));

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
// };

const createToken = (_id) => {
  return jwt.sign({ _id }, "serectfurushima", { expiresIn: "3d" });
};

app.get("/home", (req, res) => {
  res.send("this is home page");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.json({ email, token });
  } catch (e) {
    res.json({ e: e.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.signup(email, password);
    const token = createToken(user._id);
    //  res.status(200).json({email, user})
    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "User already exits" });
    } else {
      const craeteduser = User.create({ email, password });

      return res.json({ msg: "created done", craeteduser });
    }
  } catch (e) {
    console.log("some error occur", e);
  }
});
app.post("/update", async (req, res) => {
  try {
    const { id, email } = req.body;
    const filter = { _id: id };
    const update = { email: email };

    // Find the user and update their email, returning the updated document
    let doc = await User.findOneAndUpdate(filter, update, { new: true });

    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("user found sending...");
    res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (user) {
      res.json({ message: "User deleted successfully", user });
    } else {
      console.log(id);
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use('/workouts',workoutRoutes)
