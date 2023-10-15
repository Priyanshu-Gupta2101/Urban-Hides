import Review from "../models/reviewModel.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    console.log("1");
    const { product, text } = req.body;
    console.log("2");
    const user = req.user.id; // Assuming you have user authentication

    console.log(`Create a new review`);
    const newReview = new Review({ product, user, text });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Could not create the review" });
  }
};

// Like a review
export const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const user = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (!review.likes.includes(user)) {
      review.likes.push(user);
      await review.save();
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Could not like the review" });
  }
};

// Unlike a review
export const unlikeReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const user = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if the user has already liked the review
    const likedIndex = review.likes.indexOf(user);
    if (likedIndex !== -1) {
      // Remove the user's ID from the likes array
      review.likes.splice(likedIndex, 1);
      await review.save();
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Could not unlike the review" });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId, text } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.text = text;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Could not update the review" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await review.remove();

    res.status(204).end(); // No content in response
  } catch (error) {
    res.status(500).json({ error: "Could not delete the review" });
  }
};

// Get a single review by ID
export const getReview = async (req, res) => {
  try {
    const { productId, page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const reviews = await Review.paginate({ product: productId }, options);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve reviews" });
  }
};

export const getAllReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    // Check if productId is provided and valid before proceeding
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }
    console.log("1");
    // Use the productId to fetch all reviews for the specified product
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "username"
    ); // Assuming you want to populate the 'user' field with the 'username' property
    console.log("2");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve reviews" });
  }
};
