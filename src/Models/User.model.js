const Sequelize = require('sequelize')
const connectdb = require('../Database/DBConnection');

const User = connectdb.define('person', {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    },
    termscondition: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    account_type: {
        type: Sequelize.STRING,
        defaultValue: 'normal'
    }
},
    {
        freezeTableName: true
    }
);

//Relations

// User.sync({ force: true });

module.exports = User