require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./Apis/globalRoutes");
const e = require("express");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(async () => {
    const port = process.env.PORT || 8080;
    app.listen(port);
    console.log(`Server engine ${port} started...🚀🚀`);
    console.log("🟢 Connected To Mongo DB......😎");
  })

  .catch((err) => {
    console.log("🔴 Could Not Connect To Mongo DB Server......😢", err);
  });
