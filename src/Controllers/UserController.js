//Get module models
const User = require('../Models/User.model');

//Helpers
const { findUserByCpf, findUserByEmail, findUserById } = require('../Helpers/FindDB');
const createUserToken = require('../Helpers/CreateUserToken');
const getToken = require('../Helpers/getToken');
const getUserByToken = require('../Helpers/getUserByToken');

//other modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
    static async register(req, res) {
        const { firstname, lastname, email, password, confirmPassword, cpf, termscondition } = req.body

        //Validations
        if (!firstname) {
            res.status(422).json({ message: 'O primeiro nome precisa ser preenchido!' })
            return
        }
        if (!lastname) {
            res.status(422).json({ message: 'O segundo nome precisa ser preenchido!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email precisa ser preenchido!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha precisa ser preenchido!' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação da senha precisa ser preenchido!' })
            return
        }
        if (!cpf) {
            res.status(422).json({ message: 'O cpf precisa ser preenchido!' })
            return
        }

        if (termscondition !== true) {
            res.status(422).json({ message: 'Os termos e condições precisa ser aceitas!' })
            return
        }

        //Verify confirm password combine with password
        if (password !== confirmPassword) {
            res.status(422).json({ message: 'As senhas digitadas não são iguais!' })
            return
        }


        //Verifying if existing cpf, and email in database
        const checkUserCpf = await findUserByCpf(cpf);
        if (checkUserCpf) {
            res.status(422).json({ message: 'Já existe um usuario com esse CPF no sistema!' })
            return
        }
        const checkUserEmail = await findUserByEmail(email);
        if (checkUserEmail) {
            res.status(422).json({ message: 'Já existe um usuario com esse email no sistema!' })
            return
        }


        //Create Hash password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);


        //Create new user in database
        try {
            const user = await User.create({
                firstname,
                lastname,
                email,
                password: hashPassword,
                cpf,
                termscondition
            })
            await createUserToken(user, req, res);
        } catch (error) {
            res.status(400).json({ message: "Erro processar sua solicitação!" })
        }
    }

    static async getUserById(req, res) {
        const id = req.params.id
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid request id' });
            return
        }
        const user = await findUserById(id);
        if (user) {
            user.password = undefined
        } else {
            res.status(404).json({ message: 'Usuario não encontrado!' })
            return
        }

        try {
            res.status(200).json({ User: user })
        } catch (error) {
            res.status(500).json({
                message: 'Erro na requisição do ID',
                error
            })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email precisa ser preenchido!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha precisa ser preenchido!' })
            return
        }

        //Verify if exist a user with this email
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(422).json({ message: 'Conta invalida!' })
            return
        }

        //Check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha invalida!' })
            return
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res) {

        let currentUser
        console.log(req.headers.authorization)

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'abd4b9ba6539ea7d95d92b61126f4f9cda3499432642800a1cf7729a');

            currentUser = await findUserById(decoded.id);
            currentUser.password = undefined // Remove password the user
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser);
    }

    static async editUser(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (!user) {
            res.status(400).json({ message: "Erro interno!" });
            console.log(`Error, user is ${user}`)
            return
        }

        const { firstname, lastname, email, password, confirmPassword } = req.body

        if (!firstname) {
            res.status(422).json({ message: "O primeiro nome é obrigatorio!" });
            return
        }

        if (!lastname) {
            res.status(422).json({ message: "O segundo nome é obrigatorio!" });
            return
        }

        if (!email) {
            res.status(422).json({ message: "O Email é obrigatorio!" });
            return
        }

        if (req.file) {
            var image = req.file.filename
        }

        //Check if email has alraedy taken
        const checkEmail = await findUserByEmail(email);
        if (user.email !== email && checkEmail) {
            res.status(422).json({ message: "Utilize outro email!" });
            return
        }

        if (password != confirmPassword) {
            res.status(422).json({ message: "As senhas não conferem!" });
            return
        } else if (password === confirmPassword && password != null) {
            //Create new password
            //Create Hash password
            var salt = await bcrypt.genSalt(12);
            var hashPassword = await bcrypt.hash(password, salt);
        }

        try {
            await User.update(
                {
                    firstname,
                    lastname,
                    email,
                    password: hashPassword,
                    image
                },
                { where: { id: user.id } }
            );
            res.status(200).json({ message: "Perfil atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error })
            console.log(error)
        }
    }
}