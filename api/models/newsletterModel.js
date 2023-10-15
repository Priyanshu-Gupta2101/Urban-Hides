import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

newsletterSchema.plugin(mongoosePaginate);

export default mongoose.model("NewsLetter", newsletterSchema);
