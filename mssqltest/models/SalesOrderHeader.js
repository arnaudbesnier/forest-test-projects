'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SalesOrderHeader', {
    SalesOrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RevisionNumber: {
      type: DataTypes.INTEGER,
    },
    OrderDate: {
      type: DataTypes.DATE,
    },
    DueDate: {
      type: DataTypes.DATE,
    },
    ShipDate: {
      type: DataTypes.DATE,
    },
    Status: {
      type: DataTypes.INTEGER,
    },
    OnlineOrderFlag: {
      type: DataTypes.INTEGER,
    },
    SalesOrderNumber: {
      type: DataTypes.STRING,
      // primaryKey: true // REMOVED MANUALLY
    },
    PurchaseOrderNumber: {
      type: DataTypes.STRING,
    },
    AccountNumber: {
      type: DataTypes.STRING,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    ShipToAddressID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    BillToAddressID: {
      type: DataTypes.INTEGER,
      // primaryKey: true // REMOVED MANUALLY
    },
    ShipMethod: {
      type: DataTypes.STRING,
    },
    CreditCardApprovalCode: {
      type: DataTypes.STRING,
    },
    Comment: {
      type: DataTypes.STRING,
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
        Model.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
        Model.belongsTo(models.Address, {
          foreignKey: 'ShipToAddressID',
          as: 'shipToAddress'
        });
        Model.belongsTo(models.Address, {
          foreignKey: 'BillToAddressID',
          as: 'billToAddress'
        });
      }
    },
    schema: 'SalesLT',
    tableName: 'SalesOrderHeader',
    timestamps: false,
  });

  return Model;
};
