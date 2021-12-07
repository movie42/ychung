import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
  voteName: { type: String, trim: true },
  agree: { type: Number, default: 0 },
  disagree: { type: Number, default: 0 },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: { type: Date }
});

const model = mongoose.model("Vote", voteSchema);

export default model;
