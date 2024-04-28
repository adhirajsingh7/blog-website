require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.user_verification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token is required!" });
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Authentication failed!" });
    } else {
      const user = await User.findOne({
        where: {
          uuid: data.user,
        },
      });
      if (user) next();
      else res.status(401).json({ message: "Authentication failed!" });
    }
  });
};
