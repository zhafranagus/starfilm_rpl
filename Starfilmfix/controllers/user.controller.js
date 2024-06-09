const User = require('../models/user');
const Review = require('../models/review');

const UserController = {
	profile: async (req, res) => {
		try {
			const user = await User.findById(req.user.id, '-password');
			return res.render('user/profile', {
				user: user,
				error: req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	reviews: async (req, res) => {
		try {
			const reviews = await Review.find({ user: req.user.id }).populate('user', '-password');

			return res.render('reviews/index', {
				reviews: reviews,
				error: req.flash('error'),
				success: req.flash('success'),
				user: req.user,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = UserController;
