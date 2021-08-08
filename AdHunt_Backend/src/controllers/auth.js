"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const { userModel, cc, business } = require("../models/user");
const login = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password")) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });
    }

    if (!Object.prototype.hasOwnProperty.call(req.body, "email")) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a email property",
        });
    }

    // handle the request
    try {
        // get the user form the database
        let user = await userModel
            .findOne({
                email: req.body.email,
            })
            .exec();

        if (!user) {
            return res.status(404).json({
                error: "User Not Found",
                message: err.message,
            });
        }
        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) return res.status(401).send({ token: null });

        // if user is found and password is valid
        // create a token
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                role: user.role,
                image: user.image,
                kind: user.kind,
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        return res.status(200).json({
            token: token,
            userId: user._id
        });
    } catch (err) {
        console.log(err.message);
        return res.status(404).json({
            error: "User Not Found",
            message: err.message,
        });
    }
};

const register = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a username property",
        });

    // handle the request
    try {
        // hash the password before storing it in the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        // create a user object
        const user = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.isAdmin ? "admin" : "member",
            email: req.body.email,
        };

        // create the user in the database
        let retUser =
            req.body.kind.toLowerCase() == "business"
                ? await business.create(user)
                : await cc.create(user);

        // if user is registered without errors
        // create a token
        const token = jwt.sign(
            {
                _id: retUser._id,
                username: retUser.username,
                role: retUser.role,
                kind: retUser.kind,
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        // return generated token
        res.status(200).json({
            token: token,
        });
    } catch (err) {
        if (err.code == 11000) {
            console.log(err);
            return res.status(400).json({
                error: "User exists",
                message: err.message,
            });
        } else {
            console.log(err);
            return res.status(500).json({
                error: "Internal server error",
                message: err.message,
            });
        }
    }
};

const me = async (req, res) => {

    try {
        // get own user name from database
        let user = await userModel
            .findById(req.userId)
            .select("username")
            .exec();

        if (!user){
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });
        }

        return res.status(200).json(user.username);
        
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

module.exports = {
    login,
    register,
    logout,
    me,
};
