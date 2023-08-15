const mongoose = require("mongoose");
const achieversSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "pending",
        required: true,
    },
}, { timestamps: true });
const Achievers = mongoose.model("achievers", achieversSchema);
module.exports = Achievers;
