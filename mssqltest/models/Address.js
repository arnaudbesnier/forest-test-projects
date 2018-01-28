'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Address', {
    AddressID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // ADDED MANUALLY
    },
    AddressLine1: {
      type: DataTypes.STRING,
    },
    AddressLine2: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
    },
    StateProvince: {
      type: DataTypes.STRING,
    },
    CountryRegion: {
      type: DataTypes.STRING,
    },
    PostalCode: {
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
        // ADDED MANUALLY
        Model.belongsToMany(models.Customer, {
          through: models.CustomerAddress,
          foreignKey: 'AddressID'
        });
      }
    },
    schema: 'SalesLT', // ADDED MANUALLY
    tableName: 'Address',
    timestamps: false,
  });

  return Model;
};
