require("dotenv").config();
const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("../src/graphql/typeDefs");
const resolvers = require("../src/graphql/resolvers");
const mongoose = require("mongoose");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // enable GraphQL Playground IDE on prod env
});

mongoose.connect(process.env.MONGO_DB_URL);

exports.handler = server.createHandler();
