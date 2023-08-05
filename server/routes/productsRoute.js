const router = require("express").Router();
const News = require("../models/productModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlwares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");

// add a new news
router.post("/add-news", authMiddleware, async (req, res) => {
  try {
    const newNews = new News(req.body);
    await newNews.save();

    // send notification to admin
    const admins = await User.find({ role: "admin" });
    admins.forEach(async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `News added, title: ${req.body.name}`,
        title: "News Added",
        onClick: `/admin`,
        read: false,
      });
      await newNotification.save();
    });

    res.send({
      success: true,
      message: "News added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all news
router.post("/get-news", async (req, res) => {
  try {
    const { status } = req.body;

    let filters = {};

    if (status) {
      filters.status = status;
    }

    const news = await News.find(filters);

    res.send({
      success: true,
      data: news,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a news by id
router.get("/get-news-by-id/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: news,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit a news
router.put("/edit-news/:id", authMiddleware, async (req, res) => {
  try {
    await News.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "News updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a news
router.delete("/delete-news/:id", authMiddleware, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get image from pc
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload-image-to-news",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hand2hand",
      });

      const newsId = req.body.newsId;
      await News.findByIdAndUpdate(newsId, {
        $push: { images: result.secure_url },
      });
      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// update news status
router.put("/update-news-status/:id", authMiddleware, async (req, res) => {
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
});

module.exports = router;
