"use strict";

const mongoose = require("mongoose");

var options = { discriminatorKey: "kind" };

// Define the analytics schema
const AnalyticsSchema = new mongoose.Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    metricName: String,
    description: String,
    metric_image: String,
  },
  options
);

AnalyticsSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("Analytics", AnalyticsSchema);

