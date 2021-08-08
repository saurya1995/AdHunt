"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const ReviewController = require("../controllers/review");

router.get(
    "/listReviews/:partnerName",
    middlewares.checkAuthentication,
    ReviewController.listReviews
); // List all reviews that a user got

router.post(
    "/",
    middlewares.checkAuthentication,
    ReviewController.createReview
); // Create a new review, needs logged in user

router.get("/:id", ReviewController.readReview); // Read a deal by Id
router.get("/avgRate/:partnerName", ReviewController.averageRate);

module.exports = router;
