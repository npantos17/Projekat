'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {Seller} ) {
      // define association here
      this.belongsTo(Seller, {foreignKey:'sellerID', as:'seller'});
    }
  };
  Car.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price:{
     type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};