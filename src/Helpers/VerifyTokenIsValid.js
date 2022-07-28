const getToken = require('./getToken');
const jwt = require('jsonwebtoken');
const { findUserById } = require('./FindDB');

const verifyTokenIsValid = async (req, res) => {

    if (req.headers.authorization) {
        const token = getToken(req)
        const decoded = jwt.verify(token, 'abd4b9ba6539ea7d95d92b61126f4f9cda3499432642800a1cf7729a',
            function (err, decoded) {
                if (err) {
                    res.status(500).json({
                        message: 'Token expired.',
                        expiredAt: err.expiredAt
                    });
                    return
                }
                return decoded
            }
        );

        if (decoded) {
            user = await findUserById(decoded.id);
            if (!user) {
                return user = null
            }
            user.password = undefined // Remove password the user
            return user
        }

    } else {
        res.status(500).json({ message: 'Token Invalido!' })
        return
    }
}

module.exports = verifyTokenIsValid