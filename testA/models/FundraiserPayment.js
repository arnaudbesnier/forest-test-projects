'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserPayment', {
    FundraiserPaymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DonorDisplayName: {
      type: DataTypes.STRING,
    },
    DonationDate: {
      type: DataTypes.DATE,
    },
    DonorMessage: {
      type: DataTypes.STRING,
    },
    Amount: {
      type: DataTypes.DOUBLE,
    },
    MerchantUsed: {
      type: DataTypes.STRING,
    },
    PaymentStatus: {
      type: DataTypes.STRING,
    },
    PayPalPayKey: {
      type: DataTypes.STRING,
    },
    DonationForServices: {
      type: DataTypes.DOUBLE,
    },
    DonorEmail: {
      type: DataTypes.STRING,
    },
    HideDisplayName: {
      type: DataTypes.BOOLEAN,
    },
    HideDonation: {
      type: DataTypes.BOOLEAN,
    },
    WePayCheckoutID: {
      type: DataTypes.INTEGER,
    },
    WePayYouCaringCheckoutID: {
      type: DataTypes.INTEGER,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Address1: {
      type: DataTypes.STRING,
    },
    Address2: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
    },
    StateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    StateOther: {
      type: DataTypes.STRING,
    },
    CountryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Zip: {
      type: DataTypes.STRING,
    },
    PayPalTrackingID: {
      type: DataTypes.UUID,
    },
    OfflineDonation: {
      type: DataTypes.BOOLEAN,
    },
    WePayErrorMessage: {
      type: DataTypes.STRING,
    },
    WePayYouCaringErrorMessage: {
      type: DataTypes.STRING,
    },
    PayPalCorrelationID: {
      type: DataTypes.STRING,
    },
    PayPalErrorMessage: {
      type: DataTypes.STRING,
    },
    ReceiveSiteUpdates: {
      type: DataTypes.BOOLEAN,
    },
    FundraiserPaymentTrackingID: {
      type: DataTypes.STRING,
    },
    YouCaringPaymentTrackingID: {
      type: DataTypes.STRING,
    },
    FundraiserPaymentError: {
      type: DataTypes.STRING,
    },
    YouCaringPaymentError: {
      type: DataTypes.STRING,
    },
    FundraiserRefundAmount: {
      type: DataTypes.DOUBLE,
    },
    YouCaringRefundAmount: {
      type: DataTypes.DOUBLE,
    },
    DonorIp: {
      type: DataTypes.STRING,
    },
    StatusMapId: {
      type: DataTypes.INTEGER,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    ReceivePartnerUpdates: {
      type: DataTypes.BOOLEAN,
    },
    SmyteVerdict: {
      type: DataTypes.INTEGER,
    },
    TipStatus: {
      type: DataTypes.STRING,
    },
    TipStatusMapId: {
      type: DataTypes.INTEGER,
    },
    ThankYouSentFacebook: {
      type: DataTypes.BOOLEAN,
    },
    ThankYouSentEmail: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserPayment',
    
    timestamps: false,
    
  });

  return Model;
};

