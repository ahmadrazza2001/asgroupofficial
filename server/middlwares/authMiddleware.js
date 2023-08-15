const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");
module.exports = (req, res, next) => {
  try {
    // get token from header
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, jwt_secret);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
