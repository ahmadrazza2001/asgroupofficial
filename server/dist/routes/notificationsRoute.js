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
const authMiddleware = require("../middlwares/authMiddleware");
const Notification = require("../models/notificationsModel");
// add a notification
router.post("/notify", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newNotification = new Notification(req.body);
        yield newNotification.save();
        res.send({
            success: true,
            message: "Notification added successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get all notifications by user
router.get("/get-all-notifications", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const notifications = yield Notification.find({
            user: req.body.userId,
        }).sort({ createdAt: -1 });
        res.send({
            success: true,
            data: notifications,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// delete a notification
router.delete("/delete-notification/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Notification deleted successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// read all notifications by user
router.put("/read-all-notifications", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Notification.updateMany({ user: req.body.userId, read: false }, { $set: { read: true } });
        res.send({
            success: true,
            message: "All notifications marked as read",
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
