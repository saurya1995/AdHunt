"use strict";

const mongoose = require("mongoose");

const TagsProcess = ['Smooth', 'Practical', 'Super Satisfied','Annoying', 'Impractical', 'Unsatisfied'];
const TagsPartner = ['Reliable', 'Punctual', 'Super Partner','Unreliable', 'Unpunctual', 'Bad Partner'];


// Define the deal schema
const ReviewSchema = new mongoose.Schema(
    {
        // user who created the Review
        //TODO burası aslında applicationdan çekilmeli ama şimdilik böyle dursun
        username: {
            type: String, ref: "User",
            required: true,
        },
        partnerName: {
            type: String, ref: "User",
            required: true,
        },
        applicationId:{
            type: mongoose.Schema.Types.ObjectId, ref: "Application",
            required: true,
        },
        commentProcess: {
            type: String,
            required: false,
        },
        commentPartner: {
            type: String,
            required: false,
        },
        rateProcess: Number,
        ratePartner: Number,
        tagsProcess: [{
            type: String,
            enum: TagsProcess,
            default: "none",
        }],
        tagsPartner: [{
            type: String,
            enum: TagsPartner,
            default: "none",
        }],
    },
);
ReviewSchema.index({username: 1, partnerName: 1, applicationId: 1}, {unique: true});
ReviewSchema.set("versionKey", false);
ReviewSchema.set("timestamps", true);

// Export the Deal model
module.exports = mongoose.model("Review", ReviewSchema);
