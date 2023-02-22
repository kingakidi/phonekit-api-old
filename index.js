require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src *; font-src 'self' http://* 'unsafe-inline'; img-src 'self' https: http: data: blob:; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; style-src 'self' * 'unsafe-inline'; frame-src 'self' https: http: data: blob:; media-src 'self' https: http: data: blob:"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// IMPORT ROUTES
const users = require("./routes/users");
const plans = require("./routes/plans");
const auth = require("./routes/auth");
const domains = require("./routes/domains");

app.use("/users", users);
app.use("/plans", plans);
app.use("/auth", auth);
app.use("/domains", domains);

app.get("*", function (req, res) {
  res.status(500).send("Invalid Endpoint");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Your app is running on port ", PORT);
});
