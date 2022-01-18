'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Car, User, Seller}) {
      // define association here
      this.hasOne(Car)
      this.hasOne(Seller, {foreignKey:'sellerID', as:'seller'})
      //this.hasOne(User, {foreignKey:'buyerID', as:'buyer'})

    }
  };
  Order.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};