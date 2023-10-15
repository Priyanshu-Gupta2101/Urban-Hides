import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productCategoryController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  likeProductController,
  unlikeProductController,
  getCartController,
  addToCartController,
  deleteCartProductController,
  getCartItemCount,
  getBestsellers,
  clearCartController,
  customOrderController,
  getCustomOrderCOntroller,
  getAllCustomOrderCOntroller,
  getUserCustomOrderCOntroller,
  getProductsBySubcategoryId,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable-v2";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", requireSignIn, deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//subcategory
router.post("/product-subcategory", getProductsBySubcategoryId);

//product like
router.post("/like", likeProductController);

//product unlike
router.post("/unlike", unlikeProductController);

// Get cart
router.get("/get-cart", requireSignIn, getCartController);

// Add to cart
router.post("/add-to-cart", requireSignIn, addToCartController);

// Remove from cart
router.delete(
  "/remove-from-cart/:pid",
  requireSignIn,
  deleteCartProductController
);

// Define a route to get the cart item count for a particular user
router.get("/cart-count", requireSignIn, getCartItemCount);

// Define a route to get the cart item count for a particular user
router.delete("/clear-cart", requireSignIn, clearCartController);

router.get("/best-sellers", getBestsellers);

router.post("/custom", requireSignIn, customOrderController);

router.get("/custom-id", requireSignIn, getCustomOrderCOntroller);
router.get("/custom", requireSignIn, isAdmin, getAllCustomOrderCOntroller);
router.get("/custom-user", requireSignIn, getUserCustomOrderCOntroller);

export default router;
