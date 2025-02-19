import createError from "../utils/createError.js";
import Review from "../models/reviewModel.js";
import Gig from "../models/gigModel.js";
import Order from "../models/orderModel.js"

// export const createReview = async (req, res, next) => {
//   if (req.isSeller)
//     return next(createError(403, "Sellers can't create a review!"));

//   const newReview = new Review({
//     userId: req.userId,
//     gigId: req.body.gigId,
//     desc: req.body.desc,
//     star: req.body.star,
//   });

//   try {
//     const review = await Review.findOne({
//       gigId: req.body.gigId,
//       userId: req.userId,
//     });

//     if (review)
//       return next(
//         createError(403, "You have already created a review for this gig!")
//       );

//     //TODO: check if the user purchased the gig.

//     const savedReview = await newReview.save();

//     await Gig.findByIdAndUpdate(req.body.gigId, {
//       $inc: { totalStars: req.body.star, starNumber: 1 },
//     });
//     res.status(201).send(savedReview);
//   } catch (err) {
//     next(err);
//   }
// };

export const createReview = async (req, res, next) => {
    if (req.isSeller)
      return next(createError(403, "Sellers can't create a review!"));
  
    try {
      // 🔹 Step 1: Check if the user has purchased the gig
      const order = await Order.findOne({
        gigId: req.body.gigId,
        buyerId: req.userId, // Ensure the user is the buyer
        isCompleted: true, // ✅ Corrected from status: "completed"
      });
  
      if (!order) {
        return next(
          createError(403, "You can only review gigs you have purchased!")
        );
      }
  
      // 🔹 Step 2: Check if the user already reviewed this gig
      const existingReview = await Review.findOne({
        gigId: req.body.gigId,
        userId: req.userId,
      });
  
      if (existingReview) {
        return next(
          createError(403, "You have already created a review for this gig!")
        );
      }
  
      // 🔹 Step 3: Create and save the new review
      const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
      });
  
      const savedReview = await newReview.save();
  
      // 🔹 Step 4: Update the gig's total stars and review count
      await Gig.findByIdAndUpdate(req.body.gigId, {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      });
  
      res.status(201).send(savedReview);
    } catch (err) {
      next(err);
    }
  };
  
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};