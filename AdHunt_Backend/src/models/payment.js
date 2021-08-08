"use strict";

const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    unique: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
    unique: true,
  },
  transferGroup: {
    type: String,
  },
  paymentStatus: {
    type: String,
  }
});

// Define schema for ratings

PaymentSchema.set("versionKey", false);
PaymentSchema.set("timestamps", true);

// Export the Application model
module.exports = mongoose.model("Payment", PaymentSchema);
