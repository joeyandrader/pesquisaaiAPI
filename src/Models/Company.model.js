const Sequelize = require('sequelize')
const connectdb = require('../Database/DBConnection');

//models
const User = require('../Models/User.model');
const Category = require('../Models/Category.model');

const Company = connectdb.define('company', {
    fantasyname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stateregister: {
        type: Sequelize.STRING,
        allowNull: false
    },
    socialreason: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsible: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    district: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING
    },
    cel_number: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    website: {
        type: Sequelize.STRING
    },
    facebook: {
        type: Sequelize.STRING
    },
    instagram: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    approvedStatus: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    },
    enable_profile: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    url_profile: {
        type: Sequelize.STRING
    },
    banner_profile: {
        type: Sequelize.STRING
    }
},
    {
        freezeTableName: true
    }
);

//Relations
User.hasMany(Company, {
    foreignKey: {
        name: 'id_person'
    }
})

// Company.sync({ alter: true });

module.exports = Company