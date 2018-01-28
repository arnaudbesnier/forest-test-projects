'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ProductModelProductDescription', {
    ProductModelID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ProductDescriptionID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Culture: {
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
        Model.belongsTo(models.ProductModel, { foreignKey: 'ProductModelID' });
        Model.belongsTo(models.ProductDescription, { foreignKey: 'ProductDescriptionID' });
      }
    },
    schema: 'SalesLT',
    tableName: 'ProductModelProductDescription',
    timestamps: false,
  });

  return Model;
};
