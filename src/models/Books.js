const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: String,
    author: String,
    quantity: Number,
    createdAt: String,
    modifiedAt: String,
});

module.exports = model('Book', bookSchema);