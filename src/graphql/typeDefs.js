import { gql } from "graphql";

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

export default typeDefs;
