import mongoose from "mongoose";

const colorEnum = {
  Black: "#000000",
  Brown: "#A52A2A",
  Tan: "#D2B48C",
  Red: "#FF5733",
  White: "#FFFFFF",
  Gray: "#808080",
};

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    shipping: {
      type: Boolean,
    },
    size: [String],
    color: [String],
    isBestSelling: {
      type: Boolean,
      default: false,
    },
    features: [String],
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category.subcategories",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
