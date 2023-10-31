import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from "../models/categoryModel.js";
import reviewModel from "../models/reviewModel.js";
import customizedModel from "../models/customizedModel.js";
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
      size,
      color,
      features,
      subcategory,
      front,
      back,
      isBestSelling,
    } = req.fields;
    const files = [front, back];

    if (!front || !back) {
      return res.status(400).send({ error: "Images are not correct" });
    }

    //validation
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
      case !features:
        return res.status(500).send({ error: "Features is Required" });
      case shipping == null:
        return res.status(500).send({ error: "Shipping is Required" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
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
      },
      { new: true }
    );

    products.photo = [];
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
    const { checked, radio, subcategory, page } = req.body;
    const perPage = 8;
    let args = {};

    if (checked !== "all" && checked.length > 0) {
      const category = await categoryModel.find({ name: checked });
      args.category = category;
    }

    if (subcategory.length > 0) {
      args.subcategory = subcategory;
    }

    if (typeof radio === "object" && radio.length === 2) {
      if (radio[0] !== "all" && radio[1] !== "all") {
        args.price = {
          $gte: parseInt(radio[0]),
          $lte: parseInt(radio[1]),
        };
      }
    }

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const products = await productModel.find(args).skip(skip).limit(limit);

    const total = await productModel.countDocuments(args);

    res.status(200).send({
      success: true,
      products,
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
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

    // Find the index of the product with matching _id
    const indexToRemove = cart.products.findIndex((product) => {
      return product._id == pid; // Use == for loose equality check
    });

    if (indexToRemove !== -1) {
      cart.products.splice(indexToRemove, 1);
      await cart.save(); // Save the updated cart
    }

    // Send the remaining products in the response
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

export const getCartItemCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.find({ user: userId });
    const itemCount = cart ? cart[0]?.products.length : 0;

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
    const { orderId, product, user, total, address, phone } = req.body;
    const order = new customizedModel({
      orderId,
      product: product.product,
      clothingDetails: product.clothingDetails,
      buyer: user._id,
      order_at_email: user.email,
      total: total,
      address: address,
      phone: phone,
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
    const orders = await customizedModel.find();
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
    const orders = await customizedModel
      .findById(id)
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
    const orders = await customizedModel
      .find({ buyer: uid })
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

    const count = await productModel
      .find({
        subcategory: subcategory._id,
      })
      .countDocuments();

    const products = await productModel
      .find({ subcategory: subcategory._id })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products: products, count: count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.find({ _id: productId });

    if (!product) {
      res.status(404).send({ success: true, error: "Product not found" });
    } else {
      res.status(200).send({ success: true, product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      error: "An error occurred while fetching products.",
    });
  }
};
