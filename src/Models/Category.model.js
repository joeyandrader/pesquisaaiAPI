const Sequelize = require('sequelize')
const connectdb = require('../Database/DBConnection');

const Category = connectdb.define('category', {
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},
    {
        freezeTableName: true
    }
);

//relationship

// Category.sync({ force: true });

module.exports = Category