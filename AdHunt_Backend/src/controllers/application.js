"use strict";

const ApplicationModel = require("../models/application");
const { userModel } = require("../models/user");
const ObjectID = require("mongodb").ObjectID;

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    const userId = req.userId;
    // handle the request
    try {
        // create application in database
        let application = await ApplicationModel.create({
            userId: userId,
            offerId: req.body.offerId,
        });

        // return created application
        return res.status(201).json(application);
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
        // get application with id from database
        let application = await ApplicationModel.findById(req.params.id).exec();

        // if no application with id is found, return 404
        if (!application)
            return res.status(404).json({
                error: "Not Found",
                message: `Application not found`,
            });

        // return gotten application
        return res.status(200).json(application);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const update = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        // find and update application with id
        let application = await ApplicationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated application
        return res.status(200).json(application);
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
        // find and remove application
        await ApplicationModel.findByIdAndRemove(req.params.id).exec();

        // return message that application was deleted
        return res.status(200).json({
            message: `Application with id${req.params.id} was deleted`,
        });
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
        // get all applications in database
        let applications = await ApplicationModel.find({}).exec();

        // return gotten applications
        return res.status(200).json(applications);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const listMyApplications = async (req, res) => {
    try {
        const userId = req.userId;
        // get all application in database
        let user = await userModel.findById(userId);

        let applications = await ApplicationModel.aggregate([
            {
                $match: {
                    userId: ObjectID(userId),
                },
            },
            {
                $lookup: {
                    from: "offers",
                    let: {
                        offer: "$offerId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$offer"],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "user",
                            },
                        },
                        {
                            $unwind: "$user",
                        },
                        {
                            $project: {
                                "user.password": 0,
                                "user.stripeCustomerId": 0,
                                "user.stripeAccountId": 0,
                            },
                        },
                    ],
                    as: "offer",
                },
            },
            {
                $unwind: "$offer",
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "applicationId",
                    as: "reviews",
                },
            },
            {
                $set: {
                    myReview: {
                        $first: {
                            $filter: {
                                input: "$reviews",
                                as: "rev",
                                cond: {
                                    $eq: ["$$rev.username", user.username],
                                },
                            },
                        },
                    },
                },
            },
            {
                $set: {
                    partnerReview: {
                        $first: {
                            $filter: {
                                input: "$reviews",
                                as: "rev",
                                cond: {
                                    $ne: ["$$rev.username", user.username],
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    reviews: 0,
                },
            },
        ]).exec();

        // return gotten applications
        return res.status(200).json(applications);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const listOfferApplications = async (req, res) => {
    try {
        // get all applications in database
        let applications = await ApplicationModel.aggregate([
            {
                $match: {
                    offerId: ObjectID(req.params.offer_id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "applicationId",
                    as: "reviews",
                },
            },
            {
                $set: {
                    myReview: {
                        $first: {
                            $filter: {
                                input: "$reviews",
                                as: "rev",
                                cond: {
                                    $eq: ["$$rev.partnerName", "$user.username"],
                                },
                            },
                        },
                    },
                },
            },
            {
                $set: {
                    partnerReview: {
                        $first: {
                            $filter: {
                                input: "$reviews",
                                as: "rev",
                                cond: {
                                    $eq: ["$$rev.username", "$user.username"],
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    reviews: 0,
                },
            },
        ]).exec();

        // return gotten applications
        return res.status(200).json(applications);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const readUserApplications = async (req, res) => {
    try {
        // get all applications in database
        let applications = await ApplicationModel.find({
            userId: req.userId,
        }).exec();

        // return gotten applications
        return res.status(200).json(applications);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
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
    listMyApplications,
    listOfferApplications,
    readUserApplications,
};
