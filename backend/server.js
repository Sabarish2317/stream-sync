const express = require("express");
const cors = require("cors");
const connectionDb = require("./db-config");

//middleware
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

//endpoints
app.post("/login", (req, res) => {
  const email_db = "Sr@gmail.com";
  const password_db = "Sr7";
  let { email, password } = req.body;

  if (email === email_db && password === password_db) {
    res.status(200).json({ Message: "Logged in successfully" });
  } else {
    res.status(400).json({ Message: "Incorrect username or password" });
  }
});

//server and db setup
const port = process.env.SERVER_PORT || 3000;
connectionDb();
app.listen(port, "0.0.0.0", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
