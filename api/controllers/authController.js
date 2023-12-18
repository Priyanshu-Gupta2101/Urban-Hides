import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.status(400).send({ error: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is Required" });
    }

    if (password && password.length < 6) {
      return res.json({
        success: false,
        error: "Passsword is required and 6 character long",
      });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    if (newPassword && newPassword.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// updateUserController.js

export const updateUserController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Find the user by ID

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user properties
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }

    // Save the updated user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

//get user
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: "products.product",
        populate: {
          path: "category",
        },
      })
      .populate("buyer", "name");

    res.send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

//user-orders
export const getUserOrdersController = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const orders = await orderModel
      .find({ buyer: userId })
      .populate({
        path: "products.product",
        populate: {
          path: "category",
        },
      })
      .populate("buyer", "name");

    console.log(orders);

    res.send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

export const getSingleOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const order = await orderModel
      .findOne({ _id: orderId, buyer: req.user._id })
      .populate("products.product")
      .populate("buyer", "name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.send({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({
        path: "products.product",
        populate: {
          path: "category",
        },
      })
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const orderDetailsController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel
      .findById(orderId)
      .populate({
        path: "products.product",
        populate: {
          path: "category",
        },
      })
      .populate("buyer", "name");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Order",
      error,
    });
  }
};

//order status
export const orderSetStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.decode(token);

    const user = await userModel.find(
      { _id: decoded._id },
      { password: false }
    );
    res.status(200).send({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error While Fetching User Details",
      error,
    });
  }
};

export const sendOrderAfterPaypalController = async (req, res) => {
  try {
    const { orderID, products, user, total, address, phone } = req.body;
    const order = await new orderModel({
      products,
      buyer: user._id,
      order_at_email: user.email,
      total: total,
      order_id: orderID,
      address: address,
      phone: phone,
    }).save();

    res.status(200).send({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(200).send({
      success: true,
      userTot: users.length,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting users",
      error: error.message,
    });
  }
};

export const getAllAdminsController = async (req, res) => {
  try {
    const users = await userModel.find({ role: 1 });

    res.status(200).send({
      success: true,
      userTot: users.length,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting users",
      error: error.message,
    });
  }
};

const generateAccessToken = async () => {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${process.env.BASE}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createOrder = async (products, user, total, address) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${process.env.BASE}/v2/checkout/orders`;

    const payload = {
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "NO_SHIPPING",
          },
        },
      },

      items: products,
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  } catch (err) {
    console.log(err);
  }
};

function generateUniqueId() {
  return uuidv4();
}

export const validateOrderController = async (req, res) => {
  try {
    const { trackingId } = req.body;
  } catch (error) {
    console.log(error);
  }
};

const captureOrder = async (orderID, meta_id) => {
  const accessToken = await generateAccessToken();
  const uid = generateUniqueId();
  const url = `${process.env.BASE}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "PayPal-Request-Id": uid,
      "PayPal-Client-Metadata-Id": meta_id,
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export const sendOrderController = async (req, res) => {
  try {
    const { products, user, total, phone, address } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(
      products,
      user,
      total,
      address
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderID, meta_id } = req.body;
    const { jsonResponse, httpStatusCode } = await captureOrder(
      orderID,
      meta_id
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

// body: JSON.stringify({
//   intent: "CAPTURE",
//   purchase_units: [
//     {
//       reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
//       amount: { currency_code: "USD", value: "100.00" },
//     },
//   ],
//   payment_source: {
//     paypal: {
//       experience_context: {
//         payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
//         brand_name: "EXAMPLE INC",
//         locale: "en-US",
//         landing_page: "LOGIN",
//         shipping_preference: "SET_PROVIDED_ADDRESS",
//         user_action: "PAY_NOW",
//         return_url: "https://example.com/returnUrl",
//         cancel_url: "https://example.com/cancelUrl",
//       },
//     },
//   },
// });
