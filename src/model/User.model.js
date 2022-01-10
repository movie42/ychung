import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  profilePhotoUrl: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 10,
  },
  name: { type: String, required: true, trim: true, maxLength: 5 },
  password: { type: String },
  authority: {
    type: String,
    default: null,
  },
  worship: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worship",
    },
  ],
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  notice: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notice",
    },
  ],
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Documents",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: { type: Date },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const model = mongoose.model("User", userSchema);

export default model;
