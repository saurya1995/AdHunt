"use strict";

const { me } = require("./auth");
const { userModel } = require("../models/user");
const PaymentModel = require("../models/payment");
const ObjectID = require("mongodb").ObjectID;
// var bigdecimal = require("bigdecimal");
const config = require("../config");
const stripe = require("stripe")(config.stripeKey);

const FEE_PERCENTAGE = 0.07;
const PROMOTION_PERCENTAGE = 0.02;

const payout = async (req, res) => {
    // handle the request
    try {
        let transferGroup = req.body.applicationId;
        let amount = Number(req.body.amount) * 100;
        let receiver = await userModel.findOne({
            _id: ObjectID(req.body.receiver),
        });
        console.log("RECEIVER", receiver);
        const transfer = await stripe.transfers.create({
            amount: amount,
            currency: "eur",
            destination: receiver.stripeAccountId,
            transfer_group: transferGroup,
        });
        return res.status(201).json();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const checkout = async (req, res) => {
    // handle the request
    try {
        let user = await userModel.findOne({
            _id: ObjectID(req.userId),
        });
        if (!user.stripeAccountId) {
            return res.status(401).json({
                error: "Stripe account not found",
                message: "No stripe account or stripe account not connected.",
            });
        }
        let transferGroup = req.body.applicationId;
        let amount = Number(req.body.amount) * 100;
        let fee = amount * FEE_PERCENTAGE;
        fee = parseFloat(fee.toFixed(2));
        let line_items = [
            {
                name: "Content price",
                amount: amount,
                currency: "eur",
                quantity: 1,
            },
            {
                name: "Service fees",
                amount: fee,
                currency: "eur",
                quantity: 1,
            },
        ];
        if (req.body.offerPromoted) {
            let promtion_fee = amount * PROMOTION_PERCENTAGE;
            promtion_fee = parseFloat(promtion_fee.toFixed(2));
            line_items.push({
                name: "Offer promotion fees",
                amount: promtion_fee,
                currency: "eur",
                quantity: 1,
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "sofort", "sepa_debit", "giropay"],
            line_items: line_items,
            mode: "payment",
            payment_intent_data: {
                // setup_future_usage :"on_session",
                transfer_group: transferGroup,
                on_behalf_of: user.stripeAccountId,
            },
            success_url:
                req.body.successUrl /*+ "?session_id={CHECKOUT_SESSION_ID}"*/,
            cancel_url: req.body.cancelUrl,
            customer: user.stripeCustomerId,
        });
        let payment = await PaymentModel.findOneAndUpdate(
            {
                applicationId: ObjectID(req.body.applicationId),
            },
            {
                paymentIntentId: session.payment_intent,
                transferGroup: transferGroup,
                paymentStatus: session.payment_status,
            },
            {
                new: true,
                upsert: true, // Make this update into an upsert
            }
        );
        return res.status(201).json({
            checkoutUrl: session.url,
            paymentStatus: session.payment_status,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const getStripeAccount = async (req, res) => {
    // handle the request
    try {
        let user = await userModel.find({
            userId: req.userId,
        });
        let account = null;
        if (user.stripeAccountId) {
            account = await stripe.accounts.retrieve(user.stripeAccountId);
            // return account
            return res.status(201).json({
                account: account,
            });
        } else {
            return res.status(400).json({
                error: "Account non existant",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const setupStripeAccount = async (req, res) => {
    // handle the request
    try {
        // TODO CHANGE THIS
        let user = await userModel.findById(req.userId); //req.userId
        console.log(user);
        let account = null;
        if (user.stripeAccountId) {
            account = await stripe.accounts.retrieve(user.stripeAccountId);
        } else {
            account = await stripe.accounts.create({
                country: "DE",
                settings: {
                    payouts: {
                        schedule: {
                            interval: "manual",
                        },
                    },
                },
                type: "express",
                business_type:
                    user.kind == "business" ? "company" : "individual",
                email: user.email,
                capabilities: {
                    card_payments: {
                        requested: true,
                    },
                    transfers: {
                        requested: true,
                    },
                },
            });
            await userModel.updateOne(
                { _id: user._id },
                { stripeAccountId: account.id }
            );
        }
        let redirect = false;
        let accountLink = null;
        if (!account.charges_enabled) {
            redirect = true;
            accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: "http://localhost:3000/payment-settings",
                return_url: "http://localhost:3000/payment-settings",
                type: "account_onboarding",
            });
        }
        const url = accountLink ? accountLink.url : "";
        // return created user
        return res.status(201).json({
            account: account,
            redirect: redirect,
            stripeRedirectUrl: url,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const checkIfStripeAccountSetUp = async (req, res) => {
    // handle the request
    try {
        let user = await userModel.findById(req.userId);

        const account = await stripe.accounts.retrieve(user.stripeAccountId);
        // return created user
        return res.status(201).json(account.charges_enabled);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const getPaymentStatus = async (req, res) => {
    // handle the request
    try {
        let paymentIntentId = await PaymentModel.findOne({
            applicationId: req.body.applicationId,
        });
        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
        );
        // return created user
        return res.status(201).json(paymentIntent.status);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    payout,
    checkout,
    getStripeAccount,
    setupStripeAccount,
    checkIfStripeAccountSetUp,
    getPaymentStatus,
};
