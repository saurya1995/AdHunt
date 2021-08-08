"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const ApplicationController = require("../controllers/application");

router.get("/", ApplicationController.list); // List all applications

router.get(
    "/myapplications/",
    middlewares.checkAuthentication,
    ApplicationController.listMyApplications
); // List all applications

router.get(
    "/offer/:offer_id",
    middlewares.checkAuthentication,
    ApplicationController.listOfferApplications
); // Read a application by Id

router.post("/", middlewares.checkAuthentication, ApplicationController.create); // Create a new application, needs logged in user
router.get("/:id", ApplicationController.read); // Read a application by Id
router.put(
    "/:id",
    middlewares.checkAuthentication,
    // middlewares.checkIsAdmin,
    ApplicationController.update
); // Update a application by Id, needs logged in user with the admin role
router.delete(
    "/:id",
    middlewares.checkAuthentication,
    // middlewares.checkIsAdmin,
    ApplicationController.remove
); // Delete a application by Id, needs logged in user with the admin role

module.exports = router;
