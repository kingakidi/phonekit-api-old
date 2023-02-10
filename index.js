require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IMPORT ROUTES
const users = require("./routes/users");
const plans = require("./routes/plans");
const auth = require("./routes/auth");

app.use("/users", users);
app.use("/plans", plans);
app.use("/auth", auth);
app.get("*", function (req, res) {
  res.status(500).send("Invalid Endpoint");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Your app is running on port ", PORT);
});
