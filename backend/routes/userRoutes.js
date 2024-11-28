import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  getFollowers,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/profile/followers/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Assuming your User model has a 'followers' field that contains an array of followers
    const user = await User.findById(userId).populate("followers");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ followers: user.followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching followers" });
  }
});

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

export default router;
