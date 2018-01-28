'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CustomerAddress', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true  // REMOVED MANUALLY
    },
    AddressID: {
      type: DataTypes.INTEGER,
      primaryKey: true  // REMOVED MANUALLY
    },
    AddressType: {
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
        Model.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
        Model.belongsTo(models.Address, { foreignKey: 'AddressID' });
      }
    },
    schema: 'SalesLT',
    tableName: 'CustomerAddress',
    timestamps: false,
  });

  return Model;
};
