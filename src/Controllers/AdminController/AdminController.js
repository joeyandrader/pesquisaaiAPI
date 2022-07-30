//Models
const User = require('../../Models/User.model');
const Category = require('../../Models/Category.model');
const Product = require('../../Models/Product.model');

//configs
const slugify = require('slugify');

module.exports = class AdminController {
    static async index(req, res) {
        res.status(200).json({ message: 'Admin index' });
    }

    static async categoryRegister(req, res) {
        const { name } = req.body

        if (!name) {
            res.status(422).json({ message: "O nome precisa ser preenchido!" })
            return
        }

        const verifyCategory = await Category.findOne({ where: { name: name } });

        if (verifyCategory) {
            res.status(201).json({ message: `Essa categoria ${name} ja existe!` });
            return
        }

        try {
            await Category.create({
                name,
                slug: slugify(name)
            })
            res.status(201).json({ message: `Categoria ${name} criada com sucesso!` })
        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar a categoria ${error}` })
        }
    }
}