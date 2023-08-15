var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlwares/authMiddleware");
// new user registration
router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // check if user already exists
        const user = yield User.findOne({ email: req.body.email });
        if (user) {
            throw new Error("User already exists");
        }
        // hash password
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        // save user
        const newUser = new User(req.body);
        yield newUser.save();
        res.send({
            success: true,
            message: "User created successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// user login
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // check if user exists
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User not found");
        }
        // if user is active
        if (user.status !== "active") {
            throw new Error("The user account is blocked , please contact admin");
        }
        // compare password
        const validPassword = yield bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw new Error("Invalid password");
        }
        // create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });
        // send response
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get current user
router.get("/get-current-user", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.body.userId);
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get all users
router.get("/get-users", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.send({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// update user status
router.put("/update-user-status/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield User.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "User status updated successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
module.exports = router;
