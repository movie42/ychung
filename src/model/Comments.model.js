import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  notice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notice",
  },
  qt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QT",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: { type: Date },
});

const model = mongoose.model("Comments", commentSchema);

export default model;
