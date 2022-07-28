const Sequelize = require('sequelize')
const connectdb = require('../Database/DBConnection');

//Model
const Category = require('./Category.model');
const Company = require('./Company.model');
const User = require('./User.model');

const Product = connectdb.define('product', {
    type: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    productStatus: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    approvedStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
    },
    views: {
        type: Sequelize.INTEGER,
        default: 0
    }
},
    {
        freezeTableName: true
    }
);


//Relations

Category.hasMany(Product, {
    foreignKey: {
        name: 'id_category'
    }
})

Company.hasMany(Product, {
    foreignKey: {
        name: 'id_company'
    }
});

// Product.sync({ force: true });

module.exports = Product