const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("../src/graphql/typeDefs");
const resolvers = require("../src/graphql/resolvers");
const { connection: dbConnection } = require("../src/database/util");

dbConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  //introspection: true,
});

exports.handler = server.createHandler({
  // cors: {
  //   origin: "*",
  //   credentials: true,
  // },
});
