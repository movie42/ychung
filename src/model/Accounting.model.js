import mongoose from "mongoose";

const accountingSchema = mongoose.Schema({
  date: {
    year: { type: Number, required: true, trim: true },
    month: { type: Number, required: true, trim: true },
    date: { type: Number, required: true, trim: true },
  },
  item: { type: String, required: true, trim: true },
  itemDetail: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  detail: {
    type: String,
    required: true,
    trim: true,
  },
  value: { type: Number, requried: true, trim: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("Accounting", accountingSchema);

export default model;
