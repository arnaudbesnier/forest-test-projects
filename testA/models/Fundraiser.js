'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Fundraiser', {
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Title: {
      type: DataTypes.STRING,
    },
    Benefactor: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    AmountToRaise: {
      type: DataTypes.DOUBLE,
    },
    Deadline: {
      type: DataTypes.DATE,
    },
    CurrencyType: {
      type: DataTypes.STRING,
    },
    CreatedDate: {
      type: DataTypes.DATE,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    IsPrivate: {
      type: DataTypes.BOOLEAN,
    },
    Featured: {
      type: DataTypes.BOOLEAN,
    },
    FundraiserURL: {
      type: DataTypes.STRING,
    },
    PayPalID: {
      type: DataTypes.STRING,
    },
    ProfileHeaderImageName: {
      type: DataTypes.STRING,
    },
    AmountRaised: {
      type: DataTypes.DOUBLE,
    },
    VendorAccountIsVerified: {
      type: DataTypes.BOOLEAN,
    },
    LastDateVerified: {
      type: DataTypes.DATE,
    },
    MessageForDonors: {
      type: DataTypes.STRING,
    },
    importID: {
      type: DataTypes.INTEGER,
    },
    importedPublishField: {
      type: DataTypes.STRING,
    },
    importedSummaryField: {
      type: DataTypes.STRING,
    },
    importedVideoLink: {
      type: DataTypes.STRING,
    },
    fundraiserSummary: {
      type: DataTypes.STRING,
    },
    PayPalFirstName: {
      type: DataTypes.STRING,
    },
    PayPalLastName: {
      type: DataTypes.STRING,
    },
    PayPalAccountType: {
      type: DataTypes.STRING,
    },
    DevFundraiserID: {
      type: DataTypes.INTEGER,
    },
    WePayPortalInUse: {
      type: DataTypes.BOOLEAN,
    },
    SessionID: {
      type: DataTypes.STRING,
    },
    TwitterToken: {
      type: DataTypes.STRING,
    },
    TwitterTokenSecret: {
      type: DataTypes.STRING,
    },
    OrganizationName: {
      type: DataTypes.STRING,
    },
    Organizer: {
      type: DataTypes.STRING,
    },
    ShortBlurb: {
      type: DataTypes.STRING,
    },
    VideoUrl: {
      type: DataTypes.STRING,
    },
    UseVideoAsMainImage: {
      type: DataTypes.BOOLEAN,
    },
    VanityURL: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    ScheduledTaskCleaned: {
      type: DataTypes.BOOLEAN,
    },
    AllowContactEmails: {
      type: DataTypes.BOOLEAN,
    },
    AdminActive: {
      type: DataTypes.BOOLEAN,
    },
    CreateFundraiserTicklerSent: {
      type: DataTypes.BOOLEAN,
    },
    Version: {
      type: DataTypes.INTEGER,
    },
    CDNContainerUrl: {
      type: DataTypes.STRING,
    },
    ZipCode: {
      type: DataTypes.STRING,
    },
    IP: {
      type: DataTypes.STRING,
    },
    HasUSBankAccount: {
      type: DataTypes.BOOLEAN,
    },
    Process: {
      type: DataTypes.STRING,
    },
    Disabled: {
      type: DataTypes.BOOLEAN,
    },
    CDNFolder: {
      type: DataTypes.STRING,
    },
    IsWePayUserIPNSet: {
      type: DataTypes.BOOLEAN,
    },
    IsWePayAccountIPNSet: {
      type: DataTypes.BOOLEAN,
    },
    IsCreateFlowComplete: {
      type: DataTypes.BOOLEAN,
    },
    HasFundraiserEmailBeenSent: {
      type: DataTypes.BOOLEAN,
    },
    CompletedCreateStep: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
    },
    County: {
      type: DataTypes.STRING,
    },
    State: {
      type: DataTypes.STRING,
    },
    Country: {
      type: DataTypes.STRING,
    },
    Latitude: {
      type: DataTypes.DOUBLE,
    },
    Longitude: {
      type: DataTypes.DOUBLE,
    },
    Location: {
      type: DataTypes.STRING,
    },
    AddressStreetRoute: {
      type: DataTypes.STRING,
    },
    AddressStreetNumber: {
      type: DataTypes.STRING,
    },
    PaymentPortalInUse: {
      type: DataTypes.INTEGER,
    },
    IsLocationHidden: {
      type: DataTypes.BOOLEAN,
    },
    PaymentPortalChangeCode: {
      type: DataTypes.STRING,
    },
    RiskScore: {
      type: DataTypes.DOUBLE,
    },
    LastModifiedDate: {
      type: DataTypes.DATE,
    },
    SmyteVerdict: {
      type: DataTypes.INTEGER,
    },
    HideContactOrganizer: {
      type: DataTypes.BOOLEAN,
    },
    HideComments: {
      type: DataTypes.BOOLEAN,
    },
    VersionId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CreatedFrom: {
      type: DataTypes.INTEGER,
    },
    PartnershipID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ProfileHeaderImageBase64: {
      type: DataTypes.STRING,
    },
    AdminUpdateUserId: {
      type: DataTypes.INTEGER,
    },
    PartnershipStatus: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Fundraiser',
    
    timestamps: false,
    
  });

  return Model;
};

