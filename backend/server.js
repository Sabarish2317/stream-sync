const express = require("express");
const cors = require("cors");
//middle ware
const app = express();

app.use(express.json());

const port = 3000;
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use(cors());

//endpoints
app.post("/login", (req, res) => {
  const email_db = "Sr@gmail.com";
  const password_db = "Sr7";
  let { email, password } = req.body;
  if (email === email_db && password === password_db) {
    res.status(200).json({ Message: "logged in successfully" });
  } else {
    res.status(400).json({ Message: "Incorrect username or password" });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on the port ${port}`);
  }
});
