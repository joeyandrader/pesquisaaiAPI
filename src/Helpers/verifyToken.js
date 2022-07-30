const jwt = require('jsonwebtoken');
const getToken = require('./getToken');
const configs = require('../Configs/configs');

//Middleware to validate token
const checkToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    try {
        const verified = jwt.verify(token, configs.secret)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: "Token Invalido!" });
    }
}

module.exports = checkToken