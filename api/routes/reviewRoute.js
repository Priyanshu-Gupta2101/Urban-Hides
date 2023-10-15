import express from "express";
const router = express.Router();
import {
  unlikeReview,
  createReview,
  likeReview,
  updateReview,
  deleteReview,
  getReview,
  getAllReviewsForProduct,
} from "../controllers/reviewController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable-v2";

// Create a new review
router.post("/create", requireSignIn, formidable(), createReview);

// Like a review
router.post("/like", requireSignIn, formidable(), likeReview);

// Unlike a review
router.post("/unlike", requireSignIn, formidable(), unlikeReview);

// Update a review
router.put("/:reviewId", requireSignIn, formidable(), updateReview);

// Delete a review
router.delete("/:reviewId", requireSignIn, deleteReview);

// Get a single review
router.get("/:reviewId", getReview);

//Get all reviews related to a product
router.get("/api/v1/review/getAllReviews", getAllReviewsForProduct);

export default router;
