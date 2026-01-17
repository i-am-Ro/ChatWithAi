const exprss = require("express");
const app = exprss();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
const AppRouter = require("./Routes/AppRouter");
app.use("/api", AppRouter);

app.listen(PORT, () => {
  console.log("server is running");
});
