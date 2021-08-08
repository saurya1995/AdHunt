"use strict";

const ReviewModel = require("../models/review");

const createReview = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        let review = await ReviewModel.create({
            ...req.body,
        });

        return res.status(201).json(review);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const readReview = async (req, res) => {
    try {
        // get user with id from database
        let review = await ReviewModel.find({ _id: req.params.id }).exec();
        if (!review)
            return res.status(404).json({
                error: "Not Found",
                message: `user not found`,
            });

        return res.status(200).json(review);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};
const listReviews = async (req, res) => {
    try {
        let reviews = await ReviewModel.find({
            partnerName: req.params.partnerName,
        }).exec();
        // return gotten deals
        return res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const averageRate = async (req, res) => {
    try {
        let rate = await ReviewModel.aggregate(
            [
                {
                    $group: {
                        _id: "$partnerName",
                        ratingAvg: {
                            $avg: "$ratePartner",
                        },
                    },
                },
            ],
            function (err, data) {
                if (err) throw err;
                console.log(
                    "data: ",
                    req.params.partnerName,
                    JSON.stringify(data, undefined, 2)
                );
            }
        );
        for (let i = 0; i < rate.length; i++) {
            if (rate[i]._id === req.params.partnerName) {
                return res.status(200).json(Math.round(rate[i].ratingAvg));
            }
        }
        return res.status(200).json(0);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};
module.exports = {
    createReview,
    readReview,
    listReviews,
    averageRate,
};
