import mongoose from "mongoose";
import shortId from "shortid";

const urlSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shortUrl: {
      type: String,
      required: true,
      default: shortId.generate,
    },
    longUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urlClicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
