import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState == 1) {
      console.log("Database Connected");
      return connection;
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
