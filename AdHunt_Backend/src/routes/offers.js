"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const OfferController = require("../controllers/offers");

router.get("/", OfferController.list); // List all offers

router.get("/kind/:kind", 
middlewares.checkAuthenticationAndContinue,
OfferController.listFiltered); // List all offers

router.get("/user/:user_id", OfferController.listUserOffers);

router.get("/myoffers", 
middlewares.checkAuthentication,
OfferController.listMyOffers);

router.post(
    "/",
    middlewares.checkAuthentication,
    OfferController.create
); // Create a new offer, needs logged in user

router.get("/:id", OfferController.read); // Read a offer by Id
router.put(
    "/:id",
    middlewares.checkAuthentication,
    OfferController.update
); // Update a offer by Id, needs logged in user with the admin role

router.delete(
    "/:id",
    middlewares.checkAuthentication,
    OfferController.remove
); // Delete a offer by Id, needs logged in user with the admin role

module.exports = router;
