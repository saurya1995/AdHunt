"use strict";

const CategoriesModel = require("../models/categories");

const readCategoriesList = async (req, res) => {
    try {

        let categories = await CategoriesModel.find().exec();

        if (!categories)
            return res.status(404).json({
                error: "Not Found",
                message: `Offer not found`,
            });
        return res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const readSubCategories = async (req, res) => {
    try {
        // get subcategories with id from database
        let subCategories = await CategoriesModel
            .find({ category: req.params.category })
            .exec();

        // if no subcategory with id is found, return 404
        if (!subCategories)
            return res.status(404).json({
                error: "Not Found",
                message: `user not found`,
            });

        // return gotten subcategories
        return res.status(200).json(subCategories);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const createCategory = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        let category = await CategoriesModel.create(req.body);

        return res.status(201).json(category);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    readCategoriesList,
    readSubCategories,
    createCategory
};

