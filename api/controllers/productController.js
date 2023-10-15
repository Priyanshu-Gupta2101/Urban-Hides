import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from "../models/categoryModel.js";
import reviewModel from "../models/reviewModel.js";
import cartModel from "../models/cartModel.js";
import dotenv from "dotenv";
import fs from "fs";
import slugify from "slugify";
import JWT from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      isBestSelling,
      size,
      color,
      features,
      subcategory,
      front,
      back,
    } = req.fields;

    const files = [front, back];

    if (!front || !back) {
      return res.status(400).send({ error: "Images are not correct" });
    }

    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !subcategory:
        return res.status(400).send({ error: "SubCategory is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case !size:
        return res.status(400).send({ error: "Size is Required" });
      case !color:
        return res.status(400).send({ error: "Color is Required" });
      case !features:
        return res.status(400).send({ error: "Features is Required" });
      case shipping == null:
        return res.status(400).send({ error: "Shipping is Required" });
      case isBestSelling == null:
        return res.status(400).send({ error: "isBestSelling is Required" });
    }

    const products = new productModel({
      name: name,
      description: description,
      isBestSelling: isBestSelling,
      price: price,
      category: category,
      subcategory: subcategory,
      shipping: shipping,
      quantity: quantity,
      size: size.split(","),
      color: color.split(","),
      features: features.split(","),
      slug: slugify(name),
    });

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file, {
        folder: "your-upload-preset",
      });
      products.photo.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");

    if (product == null) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      isBestSelling,
      size,
      color,
      feature,
      subcategory,
    } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !subcategory:
        return res.status(500).send({ error: "SubCategory is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !size:
        return res.status(500).send({ error: "Size is Required" });
      case !color:
        return res.status(500).send({ error: "Color is Required" });
      case !feature:
        return res.status(500).send({ error: "Features is Required" });
      case shipping == null:
        return res.status(500).send({ error: "Shipping is Required" });
      case isBestSelling == null:
        return res.status(500).send({ error: "isBestSelling is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio, subcategory } = req.body;
    let prices = [];
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (subcategory.length > 0) args.subcategory = subcategory;
    if (radio.length) {
      prices = radio.split(",");
    }
    args.price = {
      $gte: parseInt(prices[0]),
      $lte: parseInt(prices[1]),
    };

    const category = await categoryModel.findOne({ name: checked });
    args.category = category;
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const regex = new RegExp(keyword, "i");

    const matchingCategories = await categoryModel.find({
      name: regex,
    });

    const categoryIds = matchingCategories.map((category) => category._id);
    const resutls = await productModel.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: { $in: categoryIds } },
      ],
    });
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get products by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

export const getBestsellers = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const skipcount = parseInt(skip);
    const limitcount = parseInt(limit);

    const products = await productModel
      .find({ isBestSelling: true })
      .populate("category")
      .skip(skipcount)
      .limit(limitcount)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// Like a review
export const likeProductController = async (req, res) => {
  try {
    const { pid } = req.body;
    const user = req.user.id;

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.likes.includes(user)) {
      product.likes.push(user);
      await product.save();
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Could not like the product" });
  }
};

// Unlike a review
export const unlikeProductController = async (req, res) => {
  try {
    const { pid } = req.body;
    const user = req.user.id;

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user has already liked the review
    const likedIndex = product.likes.indexOf(user);
    if (likedIndex !== -1) {
      // Remove the user's ID from the likes array
      product.likes.splice(likedIndex, 1);
      await product.save();
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Could not unlike the product" });
  }
};

export const addToCartController = async (req, res) => {
  try {
    const id = req.user._id;
    const { product, quantity, size, color } = req.body;
    const cart = await cartModel.findOne({ user: id });

    if (cart) {
      cart.products.push({
        product: product,
        quantity: quantity,
        size: size,
        color: color,
      });
      cart.save();
    } else {
      const newCart = await new cartModel({
        user: id,
        products: [
          { product: product, quantity: quantity, size: size, color: color },
        ],
      }).save();
    }

    res.status(200).send({
      success: true,
      message: "Product added to cart",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Could not add to cart",
      err,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const id = req.user._id;
    const cart = await cartModel.find({ user: id }).populate({
      path: "products.product",
      populate: {
        path: "category",
      },
    });
    res.status(200).send({
      success: true,
      message: "Cart fetched",
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Could not fetch cart",
      err,
    });
  }
};

export const deleteCartProductController = async (req, res) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const uid = decode._id;
    const { pid } = req.params;
    const cart = await cartModel.findOne({ user: uid });
    cart.products = cart.products.filter((product) => product.product != pid);
    cart.save();
    res.status(200).send({
      success: true,
      message: "Product deleted from cart",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Could not delete product from cart",
      err,
    });
  }
};

export const clearCartController = async (req, res) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const uid = decode._id;
    const cart = await cartModel.findOne({ user: uid });
    await cart.remove();

    res
      .status(200)
      .json({ success: true, message: "User cart cleared successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to clear user cart",
      error: err.message,
    });
  }
};

// Controller function to get the count of products in the cart of a particular user
export const getCartItemCount = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have a route parameter for the user ID

    // Query the Cart model to count the number of items for the user
    const cart = await cartModel.find({ user: userId });
    const itemCount = cart[0].products.length;

    res.status(200).json({ itemCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching cart item count" });
  }
};

export const customOrderController = async (req, res) => {
  try {
    const { product, user, clothingDetails, buyerInfo } = req.body;
    const order = new CustomizedOrder({
      clothingDetails,
      buyerInfo,
      product,
      buyer: user,
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Customized order created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create customized order",
      error: error.message,
    });
  }
};

export const getAllCustomOrderCOntroller = async (req, res) => {
  try {
    const orders = await CustomizedOrder.find();
    res
      .status(200)
      .json({ success: true, orders })
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .populate("user");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve customized orders",
      error: error.message,
    });
  }
};

export const getCustomOrderCOntroller = async (req, res) => {
  try {
    const { id } = req.body;
    const orders = await CustomizedOrder.findById(id)
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .populate("user");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve customized orders",
      error: error.message,
    });
  }
};

export const getUserCustomOrderCOntroller = async (req, res) => {
  try {
    const { uid } = req.body;
    const orders = await CustomizedOrder.find({ buyer: uid })
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .populate("user");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve customized orders",
      error: error.message,
    });
  }
};

export const getProductsBySubcategoryId = async (req, res) => {
  try {
    const { cat, subcat, pg } = req.body;
    const perPage = 8;
    const page = pg ? pg : 1;

    const category = await categoryModel.findOne({ name: cat });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subcategory = category.subcategories.find(
      (sub) => sub.name === subcat
    );

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    const products = await productModel
      .find({ subcategory: subcategory._id })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products: products });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};
