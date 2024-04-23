const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "jwtNotFound" };

    const payload = verifyToken(access_token);

    if (!payload) throw { name: "JsonWebTokenError" };

    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) throw { name: "NotFound" };

    req.additionalData = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
