// newsletterController.js
import Newsletter from "../models/newsletterModel.js";

// Subscribe to the newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already subscribed
    const existingSubscriber = await Newsletter.find({ email: email });

    if (existingSubscriber == []) {
      return res
        .status(400)
        .json({ msg: "Email is already subscribed to the newsletter." });
    }

    // Create a new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ msg: "Successfully subscribed to the newsletter!" });
  } catch (error) {
    console.error("Error subscribing to the newsletter:", error);
    res.status(500).json({ error: "Could not subscribe to the newsletter." });
  }
};
