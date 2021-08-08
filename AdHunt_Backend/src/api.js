"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const middlewares = require("./middlewares");

const auth = require("./routes/auth");
const offers = require("./routes/offers");
const application = require("./routes/applications");
const users = require("./routes/users");
const review = require("./routes/review");
const payment = require("./routes/payment");
const categories = require("./routes/categories.js");
const webhook = require("./routes/webhook");

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(middlewares.jsonParse);
api.use(middlewares.jsonEncode);
api.use(middlewares.allowCrossDomain);

// Basic route
api.get("/", (req, res) => {
  res.json({
    name: "AdHunt App Backend",
  });
});


// API routes
api.use("/auth", auth);
api.use("/offers", offers);
api.use("/applications", application);
api.use("/users", users);
api.use("/review", review);
api.use("/payment", payment);
api.use("/categories", categories);
api.use("/webhook", webhook);


module.exports = api;
