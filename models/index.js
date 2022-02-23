const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const House = require('./house_tb');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.House = House;

House.init(sequelize);
House.associate(db);

module.exports = db;

