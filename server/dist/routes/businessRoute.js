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
const Business = require("../models/businessModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlwares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");
// add a new business
router.post("/add-business", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newBusiness = new Business(req.body);
        yield newBusiness.save();
        // send notification to admin
        const admins = yield User.find({ role: "admin" });
        admins.forEach((admin) => __awaiter(this, void 0, void 0, function* () {
            const newNotification = new Notification({
                user: admin._id,
                message: `New business added, business name: ${req.body.name}`,
                title: "Business added",
                onClick: `/admin`,
                read: false,
            });
            yield newNotification.save();
        }));
        res.send({
            success: true,
            message: "Business added successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get all products
router.post("/get-business", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const business = yield Business.find(filters).sort({ createdAt: -1 });
        res.send({
            success: true,
            data: business,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// get a product by id
router.get("/get-business-by-id/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const business = yield Business.findById(req.params.id);
        res.send({
            success: true,
            data: business,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// edit a product
router.put("/edit-business/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Business.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Business updated successfully",
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}));
// delete a product
router.delete("/delete-business/:id", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Business.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Business deleted successfully",
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
router.post("/upload-image-to-business", authMiddleware, multer({ storage: storage }).single("file"), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // upload image to cloudinary
        const result = yield cloudinary.uploader.upload(req.file.path, {
            folder: "hand2hand",
        });
        const businessId = req.body.businessId;
        yield Business.findByIdAndUpdate(businessId, {
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
// update product status
/*router.put("/update-business-status/:id", authMiddleware, async (req, res) => {
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
});*/
module.exports = router;
