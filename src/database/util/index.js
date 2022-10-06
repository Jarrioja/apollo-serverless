const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config();

const connection = async () => {
  try {
    mongoose.set("debug", true);
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  connection,
  isValidObjectId,
};
