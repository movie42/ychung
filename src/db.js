import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => console.log("DB CoNECTION"));

export default db;
