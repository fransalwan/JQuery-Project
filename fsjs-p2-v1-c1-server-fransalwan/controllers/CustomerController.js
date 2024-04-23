const { Op } = require("sequelize");
const { pagination } = require("../middlewares/pagination");
const { Cuisine, Favorite, Sequelize, Customer } = require("../models");
const axios = require("axios");

class CustomerController {
  // Fetaure Tambahan Payment Gateway
  static async getProfileCustomer(req, res, next) {
    try {
      const findUser = await Customer.findByPk(req.additionalData.customerId);

      res
        .status(200)
        .json({ id: findUser.id, isSubscribed: findUser.isSubscribed });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editStatusSubscribtion(req, res, next) {
    try {
      await User.update(
        {
          isSubscribed: true,
        },
        {
          where: {
            id: req.additionalData.customerId,
          },
        }
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // Feature Utama
  static async getAllCuisines(req, res, next) {
    try {
      // Sandbox
      const where = {};
      // query params
      const { name } = req.query;

      // pagination
      const page = req.query.page ? parseInt(req.query.page) : 1; // kalo tidak ada page atau perpage di kemabalikan 1 agar tidak ada error
      const per_page = req.query.per_page ? parseInt(req.query.per_page) : 1;

      if (page <= 0 || per_page <= 0)
        throw { name: "page minimal 1 or per_page minimal 1" };

      // filter
      if (name) where.name = { [Sequelize.Op.iLike]: `%${name}%` };

      const { count, rows } = await Cuisine.findAndCountAll({
        where,
        offset: (page - 1) * page,
        limit: per_page,
        distinct: true,
        order: [["name", "ASC"]],
      });

      // count mengembalikan jumlah data

      const result = pagination({
        data: rows,
        count,
        page,
        per_page,
      });

      // console.log(count, "<<<< ini count nya");
      // console.log(count <= 0);

      if (count <= 0) {
        res.status(200).json({
          message: "CuisineNotFound",
        });
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      const { id } = req.params;

      // console.log("masuk detail");

      const result = await Cuisine.findOne({
        where: {
          id,
        },
      });

      // console.log(result, "<<<<<");
      const { data } = await axios({
        method: "POST",
        url: "https://api.qr-code-generator.com/v1/create?access-token=gMplmCjryTBgaoZFMQJH5xeDiLzOUMg3SwteUYsHJ4BAybTbILRU4yPBQVW44Btu",
        data: {
          frame_name: "no-frame",
          qr_code_text: `http://localhost:3000/cust/cuisines/${id}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });

      // v-html

      // console.log(data, "<<<< ini datanya");

      if (!result) throw { name: "Error" };

      // jika data tidak ditemukan kembalikan 404

      res.status(200).json({
        message: result,
        data,
      });
    } catch (err) {
      // console.log(err, "<<< ini errornya");
      next(err);
    }
  }

  static async getAllFavorites(req, res, next) {
    try {
      // console.log("<<<<<<masuk sini harus udah login>>>>>>");
      // console.log(req.additionalData.userId, "<<<<<<<<");
      const result = await Favorite.findAll({
        include: Cuisine,
        where: {
          CustomerId: req.additionalData.customerId,
        },
      });

      console.log(result, "<<< ini result nya");

      if (!result) throw { name: "Error" };

      res.status(200).json({
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addFavoriteById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);

      const result = await Favorite.findOrCreate({
        where: {
          CuisineId: id,
          CustomerId: req.additionalData.customerId,
        },
        defaults: {
          CustomerId: req.additionalData.customerId,
          CuisineId: id,
        },
      });

      if (!result) throw { name: "Error" };

      // jika data tidak ditemukan kembalikan 404

      res.status(201).json({
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
