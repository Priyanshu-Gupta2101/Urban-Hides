import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateUserController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getUserController,
  sendOrderController,
  orderDetailsController,
  getAllUsersController,
  getUserProfile,
  sendOrderAfterPaypalController,
  getSingleOrderController,
  orderSetStatusController,
  getUserOrdersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

router.put("/update", requireSignIn, updateUserController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders
router.get("/orders", requireSignIn, getOrdersController);

//orders
router.get("/orders/:orderId", requireSignIn, getSingleOrderController);

//orders
router.post("/user-orders", requireSignIn, isAdmin, getUserOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// single order
router.get("/order/:orderId", requireSignIn, isAdmin, orderDetailsController);

//user data
router.get("/user-details", requireSignIn, getUserController);
// order status update
router.post("/orders/capture", requireSignIn, orderStatusController);

// Send order
router.post("/send-order", requireSignIn, sendOrderController);

// Send order
router.post("/place-order", requireSignIn, sendOrderAfterPaypalController);

router.get("/users", requireSignIn, isAdmin, getAllUsersController);

router.get("/profile", requireSignIn, getUserProfile);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderSetStatusController
);

export default router;
