import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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
	weekly: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Weekly',
		},
	],
	qt: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'QT',
		},
	],
	notice: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Notice',
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comments',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updateAt: { type: Date },
});

userSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 5);
	}
});

const model = mongoose.model('User', userSchema);

export default model;
