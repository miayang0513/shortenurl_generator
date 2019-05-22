'use strict';
module.exports = (sequelize, DataTypes) => {
  const shortUrl = sequelize.define('shortUrl', {
    url: DataTypes.STRING
  }, {});
  shortUrl.associate = function(models) {
    // associations can be defined here
  };
  return shortUrl;
};