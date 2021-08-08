"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const PaymentController = require("../controllers/payment");

router.post(
    "/payout",
    middlewares.checkAuthentication,
    PaymentController.payout
);

router.post(
    "/checkout-session",
    middlewares.checkAuthentication,
    PaymentController.checkout
);

router.post(
    "/account",
    middlewares.checkAuthentication,
    PaymentController.setupStripeAccount
);

router.get(
    "/account",
    middlewares.checkAuthentication,
    PaymentController.getStripeAccount
);

router.get(
    "/payment-status",
    middlewares.checkAuthentication,
    PaymentController.getPaymentStatus
);

module.exports = router;
