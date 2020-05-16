const Sequelize = require('sequelize');
const db  = require('./db_connection');


const Comp = db.define('comp', {
    mark: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING
    }
});

Comp.sync();

module.exports = Comp;