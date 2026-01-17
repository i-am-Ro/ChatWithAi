const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log("Mongo Db error", err);
  });
