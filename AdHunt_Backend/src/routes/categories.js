"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const CategoriesController = require("../controllers/categories");

router.get("/", CategoriesController.readCategoriesList); // List all categories
router.post("/", CategoriesController.createCategory);
router.get("/type/:category", CategoriesController.readSubCategories);

module.exports = router;
