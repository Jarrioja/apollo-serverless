require("dotenv").config();
const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    exports.handler = server.createHandler();
  })
  .catch((err) => console.log(err));
