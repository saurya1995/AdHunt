"use strict";

const mongoose = require("mongoose");

var options = { discriminatorKey: "kind" };

// Define the categories schema
const CategoriesSchema = new mongoose.Schema(
  {
    category: String,
    subCategory: [String]
  },
  options
);

CategoriesSchema.set("versionKey", false);

module.exports = mongoose.model("Categories", CategoriesSchema);
