import mongoose from "mongoose";

const Connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log("error connecting the db ", e);
  }
};

export default Connectdb;
