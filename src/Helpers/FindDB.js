const User = require('../Models/User.model');
const Company = require('../Models/Company.model');


//User Finds
function findUserByCpf(search) {
    return User.findOne({ where: { cpf: search } })
}

function findUserByEmail(search) {
    return User.findOne({ where: { email: search } })
}

function findUserById(id) {
    return User.findByPk(id);
}

//Company Finds
function findCompanyByCnpj(search) {
    return Company.findOne({ where: { cnpj: search } });
}

function findAllCompanyByUserId(search) {
    return Company.findAll({ where: { id_person: search } })
}

module.exports = {
    findUserByCpf,
    findUserByEmail,
    findUserById,
    findCompanyByCnpj,
    findAllCompanyByUserId
}