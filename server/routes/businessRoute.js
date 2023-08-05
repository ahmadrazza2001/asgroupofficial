const router = require("express").Router();
const Business = require("../models/businessModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlwares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");

// add a new business
router.post("/add-business", authMiddleware, async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    await newBusiness.save();

    // send notification to admin
    const admins = await User.find({ role: "admin" });
    admins.forEach(async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `New business added, business name: ${req.body.name}`,
        title: "Business added",
        onClick: `/admin`,
        read: false,
      });
      await newNotification.save();
    });

    res.send({
      success: true,
      message: "Business added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all products
router.post("/get-business", async (req, res) => {
  try {
    const { category = [], status, points } = req.body;
    let filters = {};

    if (status) {
      filters.status = status;
    }

    // filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    const business = await Business.find(filters).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: business,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a product by id
router.get("/get-business-by-id/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.send({
      success: true,
      data: business,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit a product
router.put("/edit-business/:id", authMiddleware, async (req, res) => {
  try {
    await Business.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Business updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a product
router.delete("/delete-business/:id", authMiddleware, async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Business deleted successfully",
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
  "/upload-image-to-business",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hand2hand",
      });

      const businessId = req.body.businessId;
      await Business.findByIdAndUpdate(businessId, {
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
router.put("/update-business-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, {
      status,
    });

    // send notification to seller
    const newNotification = new Notification({
      user: updatedBusiness.seller,
      message: `Business ${updatedBusiness.name} has been ${status}`,
      title: "Business Status Updated",
      onClick: `/profile`,
      read: false,
    });

    await newNotification.save();
    res.send({
      success: true,
      message: "Business status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
