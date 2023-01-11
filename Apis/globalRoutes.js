const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes/userRoutes");
const skillsRoutes = require("./routes/skills/skillsRoutes");
const eventsRoutes = require("./routes/events/eventsRoutes");

// define all global routes here

app.use("/user", userRoute);
app.use("/skills", skillsRoutes);
app.use("/events", eventsRoutes);

module.exports = app;
