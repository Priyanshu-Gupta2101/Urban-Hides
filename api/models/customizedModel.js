import mongoose from "mongoose";

const customizedOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
    },
    clothingDetails: {
      neckround: String,
      chest: String,
      waistStomach: String,
      shoulder: String,
      vestLength: String,
      size: String,
      color: String,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancel"],
    },
    order_at_email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomizedOrder", customizedOrderSchema);
