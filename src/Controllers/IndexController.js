const Category = require('../Models/Category.model');


module.exports = class IndexController {
    static async index(req, res) {
        res.json({
            message: "Hello World"
        })
    }


    static async categorys(req, res) {
        const allCategory = await Category.findAll();

        try {
            res.status(200).json({ categorys: allCategory });
        } catch (error) {
            res.status(500).json({ error: 'erro ao listar as categorias' });
        }
    }
}