"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const UsersController = require("../controllers/users");

router.put("/:id", middlewares.checkAuthentication, UsersController.updateUser);
router.get("/analytics/:user_id", UsersController.readAnalytics);
router.put(
    "/analytics/:id",
    middlewares.checkAuthentication,
    UsersController.updateAnalytics
);
router.post("/analytics/", UsersController.createAnalytics);

router.get("/user/:username", UsersController.readUser);
router.get("/business", UsersController.businesslist); // Get all businesses
router.get("/creator", UsersController.creatorlist);

module.exports = router;
