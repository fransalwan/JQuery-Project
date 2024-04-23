const { Category } = require("../models");
class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const result = await Category.findAll();

      if (!result) throw { name: "Error" };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async addNewCategory(req, res, next) {
    try {
      const { name } = req.body;

      const created = await Category.create({
        name,
      });

      res.status(201).json({
        message: created,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Category.findOne({
        where: {
          id,
        },
      });

      const destroyed = await Category.destroy({ where: { id } });

      if (!destroyed) throw { name: "Error" };

      res.status(200).json({
        message: `${result.dataValues.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
