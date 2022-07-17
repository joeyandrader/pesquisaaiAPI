//Get module models
const User = require('../Models/User.model');

//Helpers
const { findUserByCpf, findUserByEmail, findUserById } = require('../Helpers/FindDB');

//bcrypt
const bcrypt = require('bcrypt');

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
            await User.create({
                firstname,
                lastname,
                email,
                password: hashPassword,
                cpf,
                termscondition
            })

            res.status(201).json({ message: "Conta cadastrada com sucesso!" })
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
}