const jwt = require("jsonwebtoken");
const config = require("../config/config");
const JWT_SECRET = process.env.JWT_SECRET;

function decodeToken(token) {
  return jwt.decode(token.replace("Bearer ", ""));
}
const expiresIn = "365d";
function getJWTToken(data) {
  const token = `Bearer ${jwt.sign(data, config.jwtSecret, { expiresIn })}`;
  return token;
}
function getJWTTokenForPassword(data) {
  const token = `Bearer ${jwt.sign(data, config.jwtSecret, {
    expiresIn: "2h",
  })}`;
  return token;
}

module.exports = { decodeToken, getJWTToken, getJWTTokenForPassword };
