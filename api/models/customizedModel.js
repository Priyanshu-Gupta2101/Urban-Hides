const mongoose = require("mongoose");

const customizedOrderSchema = new mongoose.Schema({
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
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  buyerInfo: {
    name: String,
    email: String,
    phone: String,
    shippingAddress: String,
  },
});

export default mongoose.model("CustomizedOrder", customizedOrderSchema);
