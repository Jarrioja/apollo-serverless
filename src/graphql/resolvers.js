const Transaction = require("../models/transaction");

module.exports = {
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
