'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Product', {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      // primaryKey: true // REMOVED MANUALLY
    },
    ProductNumber: {
      type: DataTypes.STRING,
      // primaryKey: true // REMOVED MANUALLY
    },
    Color: {
      type: DataTypes.STRING,
    },
    Size: {
      type: DataTypes.STRING,
    },
    Weight: {
      type: DataTypes.DOUBLE,
    },
    ProductCategoryID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    ProductModelID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    SellStartDate: {
      type: DataTypes.DATE,
    },
    SellEndDate: {
      type: DataTypes.DATE,
    },
    DiscontinuedDate: {
      type: DataTypes.DATE,
    },
    ThumbnailPhotoFileName: {
      type: DataTypes.STRING,
    },
    rowguid: {
      type: DataTypes.UUID,
      // primaryKey: true // REMOVED MANUALLY
    },
    ModifiedDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
        Model.belongsTo(models.ProductCategory, { foreignKey: 'ProductCategoryID' });
        Model.belongsTo(models.ProductModel, { foreignKey: 'ProductModelID' });
      }
    },
    schema: 'SalesLT',
    tableName: 'Product',
    timestamps: false,
  });

  return Model;
};
