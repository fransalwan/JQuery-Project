const { Cuisine, User, Category, History } = require("../models");
class CuisineController {
  static async getAllCuisines(req, res, next) {
    try {
      const result = await Cuisine.findAll({
        include: {
          model: User,
        },
      });

      console.log(req.additionalData.userId);

      // console.log(result, "<<<<<< ini result");

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async addNewCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const authorId = req.additionalData.userId;

      // console.log(authorId);
      const created = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId: +categoryId,
      });

      await History.create({
        name,
        description: `Cuisine with name ${name} has been created`,
        updatedBy: req.additionalData.email,
      });

      res.status(201).json({
        message: created,
      });
    } catch (err) {
      next(err);
    }
  }
  static async detailCuisine(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Cuisine.findOne({
        where: {
          id,
        },
      });

      if (!result) throw { name: "ErrorData" };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, categoryId } = req.body;

      const editCuisine = await Cuisine.update(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      if (!editCuisine) throw { name: "ErrorEdit" };

      await History.create({
        name,
        description: `Cuisine with id ${id} updated`,
        updatedBy: req.additionalData.email,
        // req.additionalData.email
      });

      res.status(201).json({
        message: `Data with id ${id} has been updated`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const cuisine = await Cuisine.findOne({
        where: {
          id,
        },
      });

      const editStatus = await Cuisine.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      if (!editStatus[0]) {
        throw { name: "ErrorEdit" };
      }

      await History.create({
        name: cuisine.name,
        description: `Article status with id ${id} has been updated from ${cuisine.status} to ${status}`,
        updatedBy: req.additionalData.email,
      });
      res.status(200).json({
        message: `Data with id ${id} has changed its status to ${status}`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCuisine(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id);
      const result = await Cuisine.findOne({
        where: {
          id,
        },
      });

      console.log(result);

      const destroyed = await Cuisine.destroy({ where: { id } });

      if (!destroyed) throw { name: "ErrorDelete" };

      // console.log(destroyed);

      res.status(200).json({
        message: `${result.dataValues.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CuisineController;
