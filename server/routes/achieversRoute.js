const router = require("express").Router();
const Achievers = require("../models/achieverModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlwares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");

// add a new achiever
router.post("/add-achievers", authMiddleware, async (req, res) => {
  try {
    const newAchievers = new Achievers(req.body);
    await newAchievers.save();

    // send notification to admin
    const admins = await User.find({ role: "admin" });
    admins.forEach(async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `New Achiever added, name: ${req.body.name}`,
        title: "Achiever added",
        onClick: `/admin`,
        read: false,
      });
      await newNotification.save();
    });

    res.send({
      success: true,
      message: "Achiever added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all products
router.post("/get-achievers", async (req, res) => {
  try {
    const { category = [], status, season } = req.body;
    let filters = {};

    if (status) {
      filters.status = status;
    }

    // filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    const achievers = await Achievers.find(filters).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: achievers,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a product by id
router.get("/get-achievers-by-id/:id", async (req, res) => {
  try {
    const achievers = await Achievers.findById(req.params.id);
    res.send({
      success: true,
      data: achievers,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit a product
router.put("/edit-achievers/:id", authMiddleware, async (req, res) => {
  try {
    await Achievers.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Achiever updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a product
router.delete("/delete-achievers/:id", authMiddleware, async (req, res) => {
  try {
    await Achievers.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Achiever deleted successfully",
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
  "/upload-image-to-achievers",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hand2hand",
      });

      const achieversId = req.body.achieversId;
      await Achievers.findByIdAndUpdate(achieversId, {
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

// update product status
/*router.put("/update-achievers-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAchievers = await Achievers.findByIdAndUpdate(req.params.id, {
      status,
    });

    // send notification to seller
    const newNotification = new Notification({
      user: updatedAchievers.seller,
      message: `Achiever ${updatedAchievers.name} has been ${status}`,
      title: "Achiever Status Updated",
      onClick: `/profile`,
      read: false,
    });

    await newNotification.save();
    res.send({
      success: true,
      message: "Achiever status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});*/

module.exports = router;
