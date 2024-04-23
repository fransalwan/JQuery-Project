const { Cuisine } = require("../models");

// pemberian kekuasaan
const authorization = async (req, res, next) => {
  try {
    //     console.log("Middleware authorization IN!");
    const { id } = req.params;
    const { userId, role } = req.additionalData;

    //     console.log(userId, role, "<<<<<<<<<<<<<<<");

    const cuisine = await Cuisine.findOne({
      where: {
        id: id,
      },
    });

    console.log(role);
    // console.log(article, "<<<<<<<<<<<<<<<<<<<<<<,");

    if (role.toLowerCase() !== "admin") {
      if (cuisine.authorId === userId) {
        return next();
      } else if (role.toLowerCase() === "admin") {
        return next();
      } else {
        throw { name: "Unauthorized" };
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization };
