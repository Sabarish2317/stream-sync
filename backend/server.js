const express = require("express");
const cors = require("cors");
const connectionDb = require("./db-config");
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
//routes
const userRoutes = require("./Routes/userAuthRoutes");
//middleware
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api", userRoutes); //user Authenticationn routes
//default endpoint
app.use("*", (req, res) => {
  console.log("correct ah type pandra");
  res.send("correct ah type pandra");
});

//server and db setup
const port = process.env.PORT;
connectionDb();
app.listen(port, "0.0.0.0", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
