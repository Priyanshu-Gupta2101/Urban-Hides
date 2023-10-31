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

// Create a new review
router.post("/create", requireSignIn, createReview);

// Like a review
router.post("/like", requireSignIn, likeReview);

// Unlike a review
router.post("/unlike", requireSignIn, unlikeReview);

// Update a review
router.put("/:reviewId", requireSignIn, updateReview);

// Delete a review
router.delete("/:reviewId", requireSignIn, deleteReview);

// Get a single review
router.get("/:reviewId", getReview);

//Get all reviews related to a product
router.get("/getAllReviews", getAllReviewsForProduct);

export default router;
