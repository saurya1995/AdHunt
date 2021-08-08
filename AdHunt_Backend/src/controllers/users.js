"use strict";

const { userModel, cc, business } = require("../models/user");
const AnalyticsModel = require("../models/analytics");

const createUser = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });

  // handle the request
  try {
    // create user in database
    let user =
      req.params.kind == "business"
        ? await business.create(req.body)
        : cc.create(req.body);
    // return created user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const readUser = async (req, res) => {
  try {
    // get user with id from database
    let user = await userModel
      .find({ username: req.params.username })
      .select("-password")
      .exec();

    // if no user with id is found, return 404
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `user not found`,
      });

    // return gotten user
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const businesslist = async (req, res) => {
  try {
    // get all offers in database
    let users = await business.find({}).exec();

    // return gotten offers
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const creatorlist = async (req, res) => {
  try {
    // get all offers in database
    let users = await cc.find({}).exec();

    // return gotten offers
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update user with id

    let user = await userModel
      .updateOne({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      .exec();

    // return updated user
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const readAnalytics = async (req, res) => {
  try {
    let analytics = await AnalyticsModel.find({
      user_id: req.params.user_id,
    }).exec();

    // if no user with id is found, return 404
    if (!analytics)
      return res.status(404).json({
        error: "Not Found",
        message: `user not found`,
      });

    // return gotten user
    return res.status(200).json(analytics);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const updateAnalytics = async (req, res) => {
  // check if the body of the request contains all necessary properties

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update analytics with id
    let analytics = await AnalyticsModel.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    // return updated user
    return res.status(200).json(analytics);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const createAnalytics = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });

  // handle the request
  try {
    // create analytics in database
    let offer = await AnalyticsModel.create(req.body);

    // return created analytics
    return res.status(201).json(offer);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  createAnalytics,
  createUser,
  readUser,
  creatorlist,
  businesslist,
  updateUser,
  readAnalytics,
  updateAnalytics,
};
