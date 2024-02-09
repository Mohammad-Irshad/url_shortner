import { Router } from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  addUrl,
  getMyUrls,
  getUrlById,
  deleteUrl,
  updateUrl,
} from "../controllers/urlControllers.js";

const router = Router();

router.route("/").post(protect, addUrl);
router.route("/mine").get(protect, getMyUrls);
router
  .route("/:id")
  .get(protect, getUrlById)
  .delete(protect, deleteUrl)
  .put(protect, updateUrl);

export default router;
