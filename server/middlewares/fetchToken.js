const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const fetchToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ error: "Please authenticate using valid token..." });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Please authenticate using valid token..." });
  }
};

module.exports = fetchToken;
