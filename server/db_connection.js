const Sequelize = require("sequelize");

const connection = new Sequelize('computers', 'root', 'root', {
  host: 'localhost',
  port: 4444,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = connection;

