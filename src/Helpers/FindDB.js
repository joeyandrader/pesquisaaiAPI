const User = require('../Models/User.model');

function findUserByCpf(search) {
    return User.findOne({ where: { cpf: search } })
}

function findUserByEmail(search) {
    return User.findOne({ where: { email: search } })
}

function findUserById(id) {
    return User.findByPk(id);
}


module.exports = {
    findUserByCpf,
    findUserByEmail,
    findUserById
}