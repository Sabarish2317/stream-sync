const express = require("express");
const cors = require("cors");
const connectionDb = require("./db-config");
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
//routes
const userRoutes = require("./Routes/routes");
//middleware
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//routes
app.use("/api", userRoutes); //user Authenticationn routes
//default endpoint
app.use("*", (req, res) => {
  console.log("correct ah type pandra");
  res.status(401).send("correct ah type pandra");
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
