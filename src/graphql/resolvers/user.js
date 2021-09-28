const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateLoginInput, validateRegisterInput } = require('../../util/validator');
const checkAuth = require('../../util/check_auth');
const { SECRET_KEY } = require('../../config/config');
const User = require('../../models/User');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        SECRET_KEY,
        {
            expiresIn: '1h'
        }
    );
}

module.exports = {

    Mutation: {
        async login(_, { email, password }) {
            
            const { errors, valid } = validateLoginInput(email, password);

            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if(!user) {
                errors.general = "Usuario no encontrado";
                throw new UserInputError('Usuario no encontrado', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = "Credenciales incorrectas!";
                throw new UserInputError('Credenciales incorrectas!', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }

        },

        async register(_, {
            registerInput: { name, lastname, email, password, confirmPassword }
        }) {

            const { valid, errors } = validateRegisterInput(name, email, password, confirmPassword);

            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if(user) {

                throw new UserInputError('Este correo ya esta tomado', {
                    errors: {
                        email: 'Este correo ya esta tomado!'
                    }
                })

            }

            const newUser = new User({
                name,
                lastname,
                email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }

        }

    }

}