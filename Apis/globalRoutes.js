const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes/userRoutes");

// define all global routes here

app.use("/user", userRoute);

module.exports = app;
