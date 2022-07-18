const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

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
        const verified = jwt.verify(token, 'abd4b9ba6539ea7d95d92b61126f4f9cda3499432642800a1cf7729a')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: "Token Invalido!" });
    }
}

module.exports = checkToken