'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Customer', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    NameStyle: {
      type: DataTypes.INTEGER,
    },
    Title: {
      type: DataTypes.STRING,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    MiddleName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Suffix: {
      type: DataTypes.STRING,
    },
    CompanyName: {
      type: DataTypes.STRING,
    },
    SalesPerson: {
      type: DataTypes.STRING,
    },
    EmailAddress: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    PasswordHash: {
      type: DataTypes.STRING,
    },
    PasswordSalt: {
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
        Model.belongsToMany(models.Address, {
          through: models.CustomerAddress,
          foreignKey: 'CustomerID'
        });
      }
    },
    schema: 'SalesLT',
    tableName: 'Customer',
    timestamps: false,
  });

  return Model;
};
