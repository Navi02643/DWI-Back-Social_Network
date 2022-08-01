const express = require("express");
const app = express();

app.use("/default", require("./default"));
app.use("/register", require("./user-route"));

module.exports = app;
