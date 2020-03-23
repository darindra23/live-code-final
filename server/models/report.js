"use strict";
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      cases: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CountryId: DataTypes.INTEGER
    },
    {}
  );
  Report.associate = function(models) {
    Report.belongsTo(models.Country);
    Report.belongsTo(models.User);
  };
  return Report;
};
