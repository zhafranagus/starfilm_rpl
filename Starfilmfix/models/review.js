const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		movieId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
