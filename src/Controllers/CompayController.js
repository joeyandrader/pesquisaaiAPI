//Model
const Company = require('../Models/Company.model');

//Helpers
const getToken = require('../Helpers/getToken');
const getUserByToken = require('../Helpers/getUserByToken');
const { findCompanyByCnpj, findAllCompanyByUserId } = require('../Helpers/FindDB');

module.exports = class CompanyController {
    static async index(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const getAllCompany = await findAllCompanyByUserId(user.id);

        res.status(200).json({ Companys: getAllCompany });
    }

    static async register(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const { fantasyname, stateregister, socialreason, cnpj, responsible, cep, address, district, address_number, city, uf, complement, cel_number, phone_number, website, facebook, instagram } = req.body

        if (!fantasyname) {
            res.status(422).json({ message: "O nome fantasia precisa ser preenchido!" })
            return
        }
        if (!stateregister) {
            res.status(422).json({ message: "O Registro estadual precisa ser preenchido!" })
            return
        }
        if (!socialreason) {
            res.status(422).json({ message: "A razão social precisa ser preenchido!" })
            return
        }
        if (!cnpj) {
            res.status(422).json({ message: "O cnpj precisa ser preenchido!" })
            return
        }
        // if (!responsible) {
        //     res.status(422).json({ message: "O responsavel precisa ser preenchido!" })
        //     return
        // }
        if (!cep) {
            res.status(422).json({ message: "O cep precisa ser preenchido!" })
            return
        }
        if (!address) {
            res.status(422).json({ message: "O endereço precisa ser preenchido!" })
            return
        }
        if (!district) {
            res.status(422).json({ message: "O bairro precisa ser preenchido!" })
            return
        }
        if (!address_number) {
            res.status(422).json({ message: "O numero do endereço precisa ser preenchido!" })
            return
        }
        if (!city) {
            res.status(422).json({ message: "A cidade precisa ser preenchido!" })
            return
        }
        if (!uf) {
            res.status(422).json({ message: "O UF precisa ser preenchido!" })
            return
        }
        if (!complement) {
            res.status(422).json({ message: "O complemento precisa ser preenchido!" })
            return
        }
        if (!cel_number) {
            res.status(422).json({ message: "O numero de celular precisa ser preenchido!" })
            return
        }
        if (!phone_number) {
            res.status(422).json({ message: "O telefone fixo precisa ser preenchido!" })
            return
        }

        const checkCompany = await findCompanyByCnpj(cnpj);

        if (checkCompany) {
            res.status(422).json({ message: "Ja existe uma empresa cadastrada com esse CNPJ!" })
            return
        }

        try {
            await Company.create({
                fantasyname,
                stateregister,
                socialreason,
                cnpj,
                responsible: user.firstname + ' ' + user.lastname,
                cep,
                address,
                district,
                address_number,
                city,
                uf,
                complement,
                cel_number,
                phone_number,
                website,
                facebook,
                instagram,
                id_person: user.id
            })
            res.status(201).json({ message: "Sua empresa foi adicionada com sucesso!" })
        } catch (error) {
            res.status(400).json({ message: "Erro ao processar sua solicitação!" })
        }
    }
}