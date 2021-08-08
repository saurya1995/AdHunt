"use strict";

const OfferModel = require("../models/offer");
const ObjectID = require("mongodb").ObjectID;

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    console.log(req);
    // handle the request
    try {
        // create offer in database
        let offer = await OfferModel.create({
            ...req.body,
            userId: req.userId,
        });

        // return created offer
        return res.status(201).json(offer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const read = async (req, res) => {
    try {
        // get offer with id from database
        let offer = await OfferModel.findById(req.params.id).exec();

        // if no offer with id is found, return 404
        if (!offer)
            return res.status(404).json({
                error: "Not Found",
                message: `Offer not found`,
            });

        // return gotten offer
        return res.status(200).json(offer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const update = async (req, res) => {
    console.log(req);
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        // find and update offer with id
        let offer = await OfferModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated offer
        return res.status(200).json(offer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        // find and remove offer
        await OfferModel.findByIdAndRemove(req.params.id).exec();

        // return message that offer was deleted
        return res
            .status(200)
            .json({ message: `Offer with id${req.params.id} was deleted` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const list = async (req, res) => {
    try {
        // get all offers in database
        let offers = await OfferModel.aggregate([
            //join collections
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            //return one document for each offer user combination
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false,
                },
            },
        ]).exec();

        // return gotten offers
        return res.status(200).json(offers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const listFiltered = async (req, res) => {
    try {
        // get all offers from businesses in database
        const userId = req.userId;
        let pipeline = [
            //join collections
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            //return one document for each offer user combination
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false,
                },
            },
            //filter for users kind
            {
                $match: {
                    "user.kind": req.params.kind,
                },
            },
            {
                $project: {
                    "user.password": 0,
                },
            },
        ];
        if (userId) {
            pipeline.push(
                ...[
                    {
                        $lookup: {
                            from: "applications",

                            let: {
                                offer: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$offerId",
                                                        "$$offer",
                                                    ],
                                                },
                                                {
                                                    $eq: ["$userId", ObjectID(userId)],
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "application",
                        },
                    },
                    {
                        $unwind: {
                            path: "$application",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                ]
            );
        }
        let offers = await OfferModel.aggregate(pipeline).exec();
        // return gotten offers
        return res.status(200).json(offers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const listUserOffers = async (req, res) => {
    try {
        // get user with id from database
        let offers = await OfferModel.find({
            userId: req.params.user_id,
        }).exec();
        // if no user with id is found, return 404
        if (!offers)
            return res.status(404).json({
                error: "Not Found",
                message: `offers not found`,
            });

        // return gotten user
        return res.status(200).json(offers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const listMyOffers = async (req, res) => {
    try {
        // get user with id from database
        let offers = await OfferModel.aggregate([
            //join collections

            {
                $match: {
                    userId: ObjectID(req.userId),
                },
            },
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "offerId",
                    as: "applicationCount",
                },
            },
            {
                $set: {
                    applicationCount: { $size: "$applicationCount" },
                },
            },

           
        ]).exec();
        // if no user with id is found, return 404
        if (!offers)
            return res.status(404).json({
                error: "Not Found",
                message: `offers not found`,
            });

        // return gotten user
        return res.status(200).json(offers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

module.exports = {
    create,
    read,
    update,
    remove,
    list,
    listFiltered,
    listUserOffers,
    listMyOffers,
};
