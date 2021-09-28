const { Schema, model } = require('mongoose');

const newUser = new Schema({
   name: String,
   lastname: String,
   rol: {
       type: String,
       default: 'Administrador'
   },
   email: String,
   password: String,
   createdAt: String
});

module.exports = model('User', newUser);