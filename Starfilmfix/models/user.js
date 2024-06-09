const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	bcrypt.hash(this.password, 10, (error, hash) => {
		if (error) return next(error);
		this.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
