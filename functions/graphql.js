require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-lambda");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    operation: {
      type: String,
      require: true,
    },
    result: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transaction", transactionSchema);

const typeDefs = gql`
  type Transaction {
    _id: ID!
    operation: String!
    result: String!
    createdAt: String!
  }
  input TransactionInputData {
    operation: String!
    result: String!
  }
  type RootQuery {
    getTransaction(id: ID!): Transaction!
  }
  type RootMutation {
    createTransaction(transactionInput: TransactionInputData): Transaction!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const resolvers = {
  createTransaction: async function ({ transactionInput }) {
    const transaction = new Transaction({
      operation: transactionInput.operation,
      result: transactionInput.result,
    });
    const createTransaction = await transaction.save();
    return {
      ...createTransaction._doc,
      _id: createTransaction._id.toString(),
      createdAt: createTransaction.createdAt.toISOString(),
    };

    /* mutation Transaction {
        createTransaction(transactionInput: {
            operation: "2+2",
            result: "4"
        }) {
          operation
          result
        }
      } */
  },
  getTransaction: async function ({ id }, req) {
    const transaction = await Transaction.findById(id);
    console.log(transaction);
    return {
      ...transaction._doc,
      _id: transaction._id.toString(),
      createdAt: transaction.createdAt.toISOString(),
    };
    /* query {
        getTransaction(id:"633f1fb8a5df35bf9b2c409d"){
          operation
          result
        }
      }*/
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // enable GraphQL Playground IDE on prod env
});

mongoose.connect(process.env.MONGO_DB_URL);

exports.handler = server.createHandler();
