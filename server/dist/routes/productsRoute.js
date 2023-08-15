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
const News = require("../models/productModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlwares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");
// add a new news
router.post("/add-news", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newNews = new News(req.body);
        yield newNews.save();
        // send notification to admin
        const admins = yield User.find({ role: "admin" });
        admins.forEach((admin) => __awaiter(this, void 0, void 0, function* () {
            const newNotification = new Notification({
                user: admin._id,
                message: `News added, title: ${req.body.name}`,
                title: "News Added",
                onClick: `/admin`,
                read: false,
            });
            yield newNotification.save();
        }));
        res.send({
            success: true,
            message: "News added successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get all news
router.post("/get-news", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        let filters = {};
        if (status) {
            filters.status = status;
        }
        const news = yield News.find(filters);
        res.send({
            success: true,
            data: news,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get a news by id
router.get("/get-news-by-id/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const news = yield News.findById(req.params.id).populate("seller");
        res.send({
            success: true,
            data: news,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// edit a news
router.put("/edit-news/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield News.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "News updated successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// delete a news
router.delete("/delete-news/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield News.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "News deleted successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
router.post("/upload-image-to-news", authMiddleware, multer({ storage: storage }).single("file"), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // upload image to cloudinary
        const result = yield cloudinary.uploader.upload(req.file.path, {
            folder: "hand2hand",
        });
        const newsId = req.body.newsId;
        yield News.findByIdAndUpdate(newsId, {
            $push: { images: result.secure_url },
        });
        res.send({
            success: true,
            message: "Image uploaded successfully",
            data: result.secure_url,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// update news status
/*router.put("/update-news-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedNews = await News.findByIdAndUpdate(req.params.id, {
      status,
    });

    // send notification to seller
    const newNotification = new Notification({
      user: updatedNews.seller,
      message: `Your news ${updatedNews.name} has been ${status}`,
      title: "News Status Updated",
      onClick: `/profile`,
      read: false,
    });

    await newNotification.save();
    res.send({
      success: true,
      message: "News status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});*/
module.exports = router;
