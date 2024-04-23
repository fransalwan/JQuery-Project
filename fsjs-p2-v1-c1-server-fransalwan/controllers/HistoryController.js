const { History } = require("../models");

class HistoryController {
  static async getAllHistory(req, res, next) {
    try {
      // console.log("ini history");
      const result = await History.findAll({
        order: [["id", "DESC"]],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async deleteHistory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
