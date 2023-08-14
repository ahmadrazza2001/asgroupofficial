const mongoose = require("mongoose");
const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    point1: {
      type: String,
    },
    point2: {
      type: String,
    },
    point3: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
      required: true,
    },

    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("business", businessSchema);

module.exports = Business;
