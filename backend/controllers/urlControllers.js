import asyncHandler from "../middlewares/asyncHandler.js";
import Url from "../models/urlModel.js";
import User from "../models/userModel.js";

// @desc    Add new Url
// @route   POST /api/urls
// @access  Private
const addUrl = asyncHandler(async (req, res) => {
  const { longUrl, description } = req.body;

  const url = new Url({
    user: req.user._id,
    longUrl,
    description,
  });

  const createdUrl = await url.save();

  res.status(201).json(createdUrl);
});

// @desc    Get logged in user urls
// @route   GET /api/urls/mine
// @access  Private
const getMyUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ user: req.user._id });
  res.json(urls);
});

// @desc    Get logged in user's url
// @route   GET /api/urls/:id
// @access  Private
const getUrlById = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);
  if (url) {
    return res.json(url);
  } else {
    res.status(404);
    throw new Error("Url not found");
  }
});

// @desc    Delete logged in user's url
// @route   DELETE /api/urls/:id
// @access  Private
const deleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (url) {
    await Url.deleteOne({ _id: url._id });
    res.json({ message: "Url deleted" });
  } else {
    res.status(404);
    throw new Error("Url not found");
  }
});

// @desc    Update a url
// @route   PUT /api/urls/:id
// @access  Private
const updateUrl = asyncHandler(async (req, res) => {
  const { longUrl, description, urlClicks } = req.body;

  const url = await Url.findById(req.params.id);

  if (url) {
    url.longUrl = longUrl || url.longUrl;
    url.description = description || url.description;
    url.urlClicks = urlClicks || url.urlClicks;

    const updatedUrl = await url.save();
    res.json(updatedUrl);
  } else {
    res.status(404);
    throw new Error("Url not found");
  }
});

export { addUrl, getMyUrls, deleteUrl, getUrlById, updateUrl };
