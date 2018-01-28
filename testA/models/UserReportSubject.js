'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserReportSubject', {
    UserReportSubjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SubjectName: {
      type: DataTypes.STRING,
    },
    SubjectDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserReportSubject',
    
    timestamps: false,
    
  });

  return Model;
};

