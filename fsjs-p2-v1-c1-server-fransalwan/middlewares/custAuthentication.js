const { Customer } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const custAuthentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "jwtNotFound" };

    const payload = verifyToken(access_token);

    if (!payload) throw { name: "JsonWebTokenError" };

    const customer = await Customer.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!customer) throw { name: "NotFound" };

    req.additionalData = {
      customerId: customer.id,
      email: customer.email,
      role: customer.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = custAuthentication;
