"use strict";

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

var options = { discriminatorKey: "kind" };

// Define the user schema
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // role of the user, used for rights management
        role: {
            type: String,
            // role can only take the value "member" and "admin"
            enum: ["member", "admin"],
            // if not specified the role member is chosen
            default: "member",
        },
        category: {
            type: String,
        },
        subCategory: [
            {
                type: String,
            },
        ],
        name: String,
        image: String,
        description: String,
        communicationDetails: [String],
        platformLinks: [String],
        //for payouts
        stripeAccountId: {
            type: String,
            unique: true,
            sparse: true,
        },
        //for taking payments
        stripeCustomerId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    options
);

var User = mongoose.model("User", UserSchema);

const ContentCreatorSchema = User.discriminator(
    "contentcreator",
    new mongoose.Schema(
        {
            /* Schema specific to content_creator */
            email: {
                type: String,
                required: true,
                unique: true,
            },
        },
        options
    )
);

const BusinessSchema = User.discriminator(
    "business",
    new mongoose.Schema(
        {
            /* Schema specific to business */
            email: {
                type: String,
                required: true,
                unique: true,
            },
        },
        options
    )
);

UserSchema.set("versionKey", false);
UserSchema.set("timestamps", true);

module.exports = {
    cc: mongoose.model("contentcreator"),
    business: mongoose.model("business"),
    userModel: mongoose.model("User"),
};
