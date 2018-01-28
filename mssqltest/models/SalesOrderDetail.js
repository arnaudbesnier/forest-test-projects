'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SalesOrderDetail', {
    SalesOrderID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    SalesOrderDetailID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    OrderQty: {
      type: DataTypes.INTEGER,
    },
    ProductID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    LineTotal: {
      type: DataTypes.DOUBLE,
    },
    rowguid: {
      type: DataTypes.UUID,
      // primaryKey: true // REMOVED MANUALLY
    },
    ModifiedDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
        Model.belongsTo(models.SalesOrderHeader, { foreignKey: 'SalesOrderID' });
        Model.belongsTo(models.Product, { foreignKey: 'ProductID' });
      }
    },
    schema: 'SalesLT',
    tableName: 'SalesOrderDetail',
    timestamps: false,
  });

  return Model;
};
