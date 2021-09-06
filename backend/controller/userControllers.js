const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @desc    auth user
// @route   POST user/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid username and password");
  }
});

// @desc    Register User
// @route   POST /user
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });
  if (user) {
    res.json("User has been created");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET /user
// @access  Public

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    DELETE user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "user removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = { getUsers, authUser, registerUser, deleteUser };
