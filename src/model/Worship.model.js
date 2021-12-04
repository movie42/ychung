import mongoose from "mongoose";

const now = new Date();

const worshipSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  word: { type: String, required: true },
  chapter: { type: Number, required: true, trim: true },
  verse: { type: Number, required: true, trim: true },
  verse_end: { type: Number, required: true, trim: true },
  pastor: { type: String, trim: true },
  worshipTeam: { type: String, trim: true },
  prayer: { type: String, required: true, trim: true },
  advertisement: { type: String, trim: true },
  reader: { type: String, trim: true },
  offering: { type: String, trim: true },
  benediction: { type: String, trim: true },
  year: { type: String, default: `${now.getFullYear()}년` },
  month: { type: String, default: `${now.getMonth() + 1}월` },
  date: { type: String, default: `${now.getDate()}일` },
  day: {
    type: String,
    default: `${["일", "월", "화", "수", "목", "금", "토"][now.getDay()]}요일`,
  },
  time: {
    type: String,
    default: `${now.getHours() > 12 ? "오후" : "오전"} ${
      now.getHours() % 12 < 10
        ? "0" + (now.getHours() % 12)
        : now.getHours() % 12
    }:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}`,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: { type: Date },
});

const model = mongoose.model("Worship", worshipSchema);

export default model;
