import mongoose from "mongoose";

const attendenceSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("Attendence", attendenceSchema);

export default model;
