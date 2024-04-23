const { User } = require("../models/index");

const authorizationStatus = async (req, res, next) => {
  try {
    const { userId } = req.additionalData;
    //     console.log(userId);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user.role.toLowerCase() === "admin") {
      next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authorizationStatus };
