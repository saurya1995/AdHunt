"use strict";

const { me } = require("./auth");
const { userModel } = require("../models/user");
const PaymentModel = require("../models/payment");
const ApplicationModel = require("../models/application");
const ObjectID = require("mongodb").ObjectID;

const config = require("../config");
const stripe = require("stripe")(config.stripeKey);

const webhook = async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endPointSecret = config.endPointSecret;
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (err) {
        console.log(err);

        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("SESSION", session);
        // Fulfill the purchase...
        let payment = await PaymentModel.findOneAndUpdate(
            { paymentIntentId: session.payment_intent },
            {
                paymentStatus: session.payment_status,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        let application = await ApplicationModel.findOneAndUpdate(
            { _id: ObjectID(payment.applicationId) },
            {
                status: "paid",
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }
    if (event.type === "customer.created") {
        //TODO does not work
        const customer = event.data.object;
        let user = await userModel.findOneAndUpdate(
            { email: customer.email },
            {
                stripeCustomerId: customer.id,
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }
    return res.status(200).send();
};

module.exports = {
    webhook,
};
