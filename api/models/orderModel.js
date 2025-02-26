import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.ObjectId, ref: "Products", required: true },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
      },
    ],
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

    order_id: {
      type: String,
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

export default mongoose.model("Order", orderSchema);
