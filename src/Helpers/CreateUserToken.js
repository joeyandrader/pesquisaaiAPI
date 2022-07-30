const jwt = require('jsonwebtoken');
const configs = require('../Configs/configs');

const createUserToken = async (user, req, res) => {
    //Create a token
    const token = jwt.sign({
        name: user.firstname,
        id: user.id,
    }, configs.secret,
        {
            expiresIn: "5h"
        },
        { algorithm: 'RS256' }
    );

    // res.setHeader('token', token) // Set header token

    //return token
    res.status(200).json({
        message: 'Você está autenticado!',
        token,
        accountType: user.account_type
    })
}

module.exports = createUserToken