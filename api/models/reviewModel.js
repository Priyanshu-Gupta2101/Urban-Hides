import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

reviewSchema.plugin(mongoosePaginate);

export default mongoose.model("Review", reviewSchema);
