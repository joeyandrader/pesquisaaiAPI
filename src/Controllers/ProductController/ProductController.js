//Models
const Product = require('../../Models/Product.model');
const User = require('../../Models/Product.model');
const Company = require('../../Models/Company.model');
const Category = require('../../Models/Category.model');


//Sequelize
const { Op } = require('sequelize');

//Helpers
const getToken = require('../../Helpers/getToken');
const getUserByToken = require('../../Helpers/getUserByToken');


module.exports = class ProductController {
    static async index(req, res) {
        res.status(200).json({ message: 'Index Product' });
        return
    }

    static async register(req, res) {
        const id = req.params.id
        const { type, name, category, description, brand, productStatus, active } = req.body

        //Verify User
        const token = getToken(req)
        if (!token) {
            res.status(500).json({ message: 'Token Invalido!' })
            return
        }
        const user = await getUserByToken(token)
        if (!user) {
            res.status(500).json({ message: 'Usuario invalido!!' })
            return
        }

        //Get company from user
        const company = await Company.findOne({
            where: {
                [Op.and]: [
                    { id_person: user.id },
                    { id: id }
                ]
            }
        })

        console.log(company)

        if (!company) {
            res.status(400).json({ message: 'Empresa invalida!' })
            return
        }

        if (!type) {
            res.status(422).json({ message: 'O tipo precisa ser preenchido!' })
            return
        }
        if (!name) {
            res.status(422).json({ message: 'O nome precisa ser preenchido!' })
            return
        }
        if (!category) {
            res.status(422).json({ message: 'A categoria precisa ser selecionada!' })
            return
        }

        //Verify if category exists
        const verifyCategory = await Category.findOne({ where: { name: category } });

        if (!verifyCategory) {
            res.status(400).json({ message: 'Essa categoria não existe!!' })
            return
        }

        if (!description) {
            res.status(422).json({ message: 'A descrição precisa ser preenchido!' })
            return
        }
        if (!brand) {
            res.status(422).json({ message: 'A marca do produto precisa ser preenchido!' })
            return
        }
        if (!req.file) {
            res.status(422).json({ message: 'A imagem do produto precisa ser preenchido!' })
            return
        }
        if (!productStatus) {
            res.status(422).json({ message: 'O estado do produto precisa ser preenchido!' })
            return
        }

        if (active == false) {
            active = false
        }

        try {
            await Product.create({
                type,
                name,
                description,
                brand,
                image: req.file.filename,
                productStatus,
                active,
                id_category: verifyCategory.id,
                id_company: company.id
            })
            res.status(201).json({ message: 'Produto adicionado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar o produto!' });
            console.log('erro ao adicionar o produto! ' + error);
        }

    }
}