const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');

const getUserByToken = async (token) => {

    if (!token) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    const decoded = jwt.verify(token, 'abd4b9ba6539ea7d95d92b61126f4f9cda3499432642800a1cf7729a')

    const userId = decoded.id
    const user = await User.findByPk(userId);

    return user
}

module.exports = getUserByToken;