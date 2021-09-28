const { gql } = require('apollo-server');

module.exports = gql`
    
    type Book {
        id: ID!
        title: String!
        author: String!
        quantity: Int!
        createdAt: String!
        modifiedAt: String!
    }

    input BookInput {
        title: String!
        author: String!
        quantity: Int!
    }

    type User {
        id: ID!
        name: String!
        lastname: String!
        rol: String!
        email: String!
        password: String!
        createdAt: String!
        token: String!
    }

    input RegisterInput {
        name: String!
        lastname: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getBooks: [Book]
        getBook(bookId: ID!): Book
    }

    type Mutation {
        createBook(bookInput: BookInput): Book
        modifyBook(bookId: ID!, title: String!, author: String!, quantity: Int!): Book
        deleteBook(bookId: ID!): String!
        login(email: String!, password: String!): User!
        register(registerInput: RegisterInput): User!
    }

`