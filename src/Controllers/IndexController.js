
module.exports = class IndexController {
    static async index(req, res) {
        res.json({
            message: "Hello World"
        })
    }
}