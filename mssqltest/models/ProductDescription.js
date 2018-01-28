'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ProductDescription', {
    ProductDescriptionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // ADDED MANUALLY
    },
    Description: {
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
        Model.belongsToMany(models.ProductModel, {
          through: models.ProductModelProductDescription,
          foreignKey: 'ProductDescriptionID'
        });
      }
    },
    schema: 'SalesLT', // ADDED MANUALLY
    tableName: 'ProductDescription',
    timestamps: false,
  });

  return Model;
};
