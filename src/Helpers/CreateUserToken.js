const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
    //Create a token
    const token = jwt.sign({
        name: user.firstname,
        id: user.id,
    }, "abd4b9ba6539ea7d95d92b61126f4f9cda3499432642800a1cf7729a",
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