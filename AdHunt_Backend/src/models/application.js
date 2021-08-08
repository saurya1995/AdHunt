"use strict";

const mongoose = require("mongoose");

const applicationStatus = ["pending", "accepted", "declined", "confirmed", "paid", "review_1", "review", "done", "rejected"]



// Define schema for ratings
const ApplicationSchema = new mongoose.Schema({
    // user who applied
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
    // rating of user
    status: {
        type: String,
        required: true,
        enum: applicationStatus,
        default: "pending",
    },
});
ApplicationSchema.index({userId: 1, offerId: 1}, {unique: true});
ApplicationSchema.set("versionKey", false);
ApplicationSchema.set("timestamps", true);

// Export the Application model
module.exports = mongoose.model("Application", ApplicationSchema);
