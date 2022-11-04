const jwt = require("jsonwebtoken");

// Generate Access Token
const generateAccessToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Generate Refresh Token
const generateRefreshToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
