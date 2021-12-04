import mongoose from "mongoose";

const now = new Date();
const blogSchema = mongoose.Schema({
  title: { type: String, require: true, trim: true },
  word: { type: String, require: true, trim: true },
  paragraph: { type: String, require: true, trim: true },
  year: { type: String, default: `${now.getFullYear()}년` },
  month: { type: String, default: `${now.getMonth() + 1}월` },
  date: { type: String, default: `${now.getDate()}일` },
  day: {
    type: String,
    default: `${
      ["일", "월", "화", "수", "목", "금", "토"][now.getDay()]
    }요일`
  },
  time: {
    type: String,
    default: `${now.getHours() > 12 ? "오후" : "오전"} ${
      now.getHours() % 12 < 10
        ? "0" + (now.getHours() % 12)
        : now.getHours() % 12
    }:${
      now.getMinutes() < 10
        ? "0" + now.getMinutes()
        : now.getMinutes()
    }`
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],
  views: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: { type: Date }
});

const model = mongoose.model("Blog", blogSchema);

export default model;
