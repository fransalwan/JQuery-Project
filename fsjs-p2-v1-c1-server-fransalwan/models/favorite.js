"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Cuisine, { foreignKey: "CuisineId" });
      Favorite.belongsTo(models.Customer, { foreignKey: "CustomerId" });
    }
  }
  Favorite.init(
    {
      CuisineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Cuisine Id is required",
          },
          notEmpty: {
            msg: "Cuisine Id is required",
          },
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Customer Id is required",
          },
          notEmpty: {
            msg: "Customer Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
