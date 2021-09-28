const BookResolvers = require('./books');
const UserResolvers = require('./user');

module.exports = {

    Query: {
        ...BookResolvers.Query
    },

    Mutation: {
        ...BookResolvers.Mutation,
        ...UserResolvers.Mutation
    }

}