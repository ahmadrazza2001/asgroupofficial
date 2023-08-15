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
const Bid = require("../models/bidModel");
const authMiddleware = require("../middlwares/authMiddleware");
// place a new bid
router.post("/place-new-bid", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newBid = new Bid(req.body);
        yield newBid.save();
        res.send({ success: true, message: "Bid placed successfully" });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
}));
// get all bids
router.post("/get-all-bids", authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { product, seller } = req.body;
        let filters = {};
        if (product) {
            filters.product = product;
        }
        if (seller) {
            filters.seller = seller;
        }
        const bids = yield Bid.find(filters)
            .populate("product")
            .populate("buyer")
            .populate("seller").sort({ createdAt: -1 });
        res.send({ success: true, data: bids });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
}));
module.exports = router;
