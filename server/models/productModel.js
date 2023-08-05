const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
  },
  { timestamps: true }
);

const News = mongoose.model("news", newsSchema);

module.exports = News;
