"use strict";

// Configuration variables
const port = process.env.PORT || "4000";
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/adhuntdb";
const JwtSecret = process.env.JWT_SECRET || "very secret secret";
const stripeKey = "sk_test_51JBKhcKP4Yau99PiPiMv1JUbGzvM9hX1SCet9CzsuLx89NxDc2QkvXKIMS3hrdhlHQwhbWjB30yLyzD7DdlYDcf500rcGxgJps";
const endPointSecret = "whsec_QcMfKWSy0Qre7Uov1wRCilwDx77rjZOm";

module.exports = {
    port,
    mongoURI,
    JwtSecret,
    stripeKey,
    endPointSecret
};
