const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');
const configs = require('../Configs/configs');

const getUserByToken = async (token) => {

    if (!token) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    const decoded = jwt.verify(token, configs.secret)

    const userId = decoded.id
    const user = await User.findByPk(userId);

    return user
}

module.exports = getUserByToken;