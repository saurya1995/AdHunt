"use strict";

const mongoose = require("mongoose");


// Define the analytics schema
const OfferSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    tags: [String],
    price: Number,
    promoted: {         
      type: Boolean,
      default: false
    },
    platform: [String]
  },
);
OfferSchema.set("timestamps", true);
OfferSchema.set("versionKey", false);

module.exports = mongoose.model("Offer", OfferSchema);

