const mongoose = require("mongoose");
//mongo db instance
const connectionDb = async () => {
  await mongoose
    .connect(
      process.env.CONNECTION_STRING
      // "mongodb+srv://sabarish7:Gu6p4AIzc740EYkf@streamsync.remcb.mongodb.net/?retryWrites=true&w=majority&appName=streamSync"
    )
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((e) => {
      console.log(`Error connecting to database: ${e}`);
    });
};

module.exports = connectionDb;
