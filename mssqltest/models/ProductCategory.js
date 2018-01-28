'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ProductCategory', {
    ProductCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ParentProductCategoryID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    Name: {
      type: DataTypes.STRING,
      // primaryKey: true // REMOVED MANUALLY
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
        Model.hasMany(models.Product, { foreignKey: 'ProductCategoryID' });
      }
    },
    schema: 'SalesLT',
    tableName: 'ProductCategory',
    timestamps: false,
  });

  return Model;
};
