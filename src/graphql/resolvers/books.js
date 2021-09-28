const Book = require('../../models/Books');


module.exports = { 
    Query: {
        async getBooks() {
            try {
                
                const books = await Book.find().sort({ createdAt: -1 })
                return books;

            } catch (r) {
                throw new Error(r);
            }
        },
        async getBook(_, { bookId }) {

            try {
                
                const book = await Book.findById(bookId);
                if(book) {
                    return book;
                } else {
                    throw new Error('Libro no encontrado');
                }

            } catch (r) {
                throw new Error(r);
            }

        }
    },
    Mutation: {

        async createBook(_, { 
            bookInput: { title, author, quantity }
         }) {

            const newBook = new Book({
                title,
                author,
                quantity,
                createdAt: new Date().toISOString()
            });

            const book = await newBook.save();

            return book;

        },
        async modifyBook(_, { bookId, title, author, quantity }) {

            try {
                
                const book = await Book.findById(bookId);

                if(book) {

                    book.title = title;
                    book.author = author;
                    book.quantity = quantity;
                    book.modifiedAt = new Date().toISOString();

                    const modifiedBook = await book.save();

                    return modifiedBook;

                } else {
                    throw new Error('Libro no encontrado')
                }

            } catch (r) {
                throw new Error(r)
            }

        },
        async deleteBook(_, { bookId }) {

            try {
                
                const bookFound = await Book.findById(bookId);
                
                if(bookFound) {

                    await Book.findByIdAndDelete(bookId);
                    return 'Libro eliminado completamente :D';

                } else {
                    throw new Error('Libro no encontrado');
                }

            } catch (error) {
                throw new Error(error);
            }

        }

    }
}