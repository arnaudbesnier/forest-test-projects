'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ProductModel', {
    ProductModelID: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
        Model.hasMany(models.Product, { foreignKey: 'ProductModelID' });
        Model.belongsToMany(models.ProductDescription, {
          through: models.ProductModelProductDescription,
          foreignKey: 'ProductModelID'
        })
      }
    },
    schema: 'SalesLT',
    tableName: 'ProductModel',
    timestamps: false,
  });

  return Model;
};
