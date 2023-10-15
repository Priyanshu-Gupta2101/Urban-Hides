import express from "express";
const router = express.Router();
import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "./../controllers/categoryController.js";

// Create a new subcategory within a category
router.post("/create", createSubcategory);

// Update a subcategory within a category
router.put("/update", updateSubcategory);

// Delete a subcategory within a category
router.delete("/delete", deleteSubcategory);

export default router;
