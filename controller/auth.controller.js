const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const { generateAccessToken } = require("../functions/generate_tokens.js");
const Customer = require("../models/customer.model.js");
const UserType = require("../models/user_type.model.js");

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { user_id, password } = req.body;

  if ((!user_id, !password)) {
    res.status(400);
    throw new Error("UserId and password are required.");
  }

  // Check for register user name
  const user = await User.findOne({ where: { user_id } });

  //
  if (!user) {
    res.status(400);
    throw new Error("User Not Found!");
  }
  //
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = generateAccessToken(user.id, user.type);
    // const refreshToken = generateRefreshToken(user._id);

    // // Saving refreshToken with current user
    // user.refreshToken = refreshToken;
    // const result = await user.save();

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.json({
      id: user.id,
      email: user.email,
      user_id: user.user_id,
      token: accessToken,
      type: user.type,
      user_status: user.user_status,
      user_name: user.user_name,
      loc_code: user.loc_code,
      account_number: user.account_number,
      status: "success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password.");
  }
});

// @desc    Register new user
// @route   POST /api/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {
    user_id,
    password,
    email,
    user_name,
    phone_number,
    loc_code,
    account_number,
    type,
    user_status,
  } = req.body;
  if (
    (!user_id,
    !password,
    !email,
    !user_name,
    !phone_number,
    !loc_code,
    !account_number)
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({
    where: {
      user_id,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Check if email exists
  const emailExist = await User.findOne({
    where: {
      email,
    },
  });

  if (emailExist) {
    res.status(400);
    throw new Error("Email already exists");
  }
  // Check if phone number exist
  const phoneExist = await User.findOne({
    where: {
      phone_number,
    },
  });

  if (phoneExist) {
    res.status(400);
    throw new Error("Phone Number already exists");
  }
  //

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    user_id,
    password: hashedPassword,
    email,
    user_name,
    phone_number,
    loc_code,
    type,
    user_status,
    account_number,
  });

  if (user) {
    const accessToken = generateAccessToken(user.id, user.type);

    res.status(201).json({
      id: user.id,
      email: user.email,
      user_id: user.user_id,
      token: accessToken,
      type: user.type,
      user_status: user.user_status,
      user_name: user.user_name,
      loc_code: user.loc_code,
      account_number: user.account_number,
      status: "success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//
const createUserType = asyncHandler(async (req, res) => {
  const { type } = req.body;
  try {
    const response = await UserType.create({ type });
    return res.status(201).json(type + " " + "Successfully Created!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// @desc    Authenticate a user
// @route   POST /api/logout
// @access  Public
// const logout = async (req, res) => {
//   // On client, also delete the accessToken

//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.status(204).json({ status: "success" }); //No content
//   const refreshToken = cookies.jwt;

//   // Is refreshToken in db?
//   const foundUser = await User.findOne({ refreshToken });
//   if (!foundUser) {
//     res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//     return res.status(204).json({ status: "success" });
//   }

//   // Delete refreshToken in db
//   foundUser.refreshToken = "";
//   const result = await foundUser.save();

//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.status(204).json({ status: "success" });
// };

// // @desc    Authenticate a user
// // @route   POST /api/token
// // @access  Public
// const newToken = asyncHandler(async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(401);
//   const refreshToken = cookies.jwt;

//   const foundUser = await User.findOne({ refreshToken }).exec();
//   if (!foundUser) return res.status(403); //Forbidden
//   // evaluate jwt
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     if (err || foundUser._id !== decoded._id) return res.status(403);
//     const accessToken = generateAccessToken(foundUser._id);
//     res.status(201).json({ accessToken, status: "success" });
//   });
// });

const createCustomer = asyncHandler(async (req, res) => {
  const { customer_name, city, owner_name } = req.body;
  try {
    const lastCustomer = await Customer.findAll({
      order: [["createdAt", "DESC"]],
    });
    var account_number = "";
    if (lastCustomer.length > 0) {
      const lastElem = lastCustomer[0].account_number.split("-").pop();
      account_number = `${city}-WMS-${+lastElem + 1}`;
    } else {
      account_number = `${city}-WMS-1000`;
    }

    const response = await Customer.create({
      customer_name,
      city,
      owner_name,
      account_number,
    });
    res.status(201).json("Created Successfully!");
  } catch (err) {
    return res.status(500).json(err);
  }
});
//
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        "id",
        "user_name",
        "user_id",
        "account_number",
        "email",
        "phone_number",
        "user_status",
      ],
    });
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//
module.exports = {
  login,
  register,
  createCustomer,
  createUserType,
  getAllUsers,
  //   logout,
  //   newToken,
};
