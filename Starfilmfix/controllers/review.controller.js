const Review = require('../models/review');

const ReviewController = {
	insert: async (req, res) => {
		try {
			const { movieId, content, rating } = req.body;
			if (!movieId || !content || !rating) {
				req.flash('error', 'All fields are required');
				return res.redirect('back');
			}

			const review = await Review({
				movieId,
				content,
				rating,
				user: req.user.id,
			});
			await review.save();

			req.flash('success', 'Review created successfully');
			return res.redirect('back');
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
	show: async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) {
				req.flash('error', 'Review ID is required');
				return res.redirect('back');
			}

			const review = await Review.findOne({
				_id: id,
				user: req.user.id,
			});
			if (!review) {
				req.flash('error', 'Review not found or unauthorized');
				return res.redirect('back');
			}

			console.log(review);
			return res.render('reviews/show', {
				review,
				error: req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
	update: async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) {
				req.flash('error', 'Review ID is required');
				return res.redirect('back');
			}

			const { content, rating } = req.body;
			if (!content || !rating) {
				req.flash('error', 'All fields are required');
				return res.redirect('back');
			}

			const review = await Review.findByIdAndUpdate(
				{
					_id: id,
					user: req.user.id,
				},
				{
					content,
					rating,
				}
			);

			if (!review) {
				req.flash('error', 'Review not found or unauthorized');
				return res.redirect('back');
			}

			req.flash('success', 'Review updated successfully');
			return res.redirect('back');
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) {
				req.flash('error', 'Review ID is required');
				return res.redirect('back');
			}

			const review = await Review.findOneAndDelete({
				_id: id,
				user: req.user.id,
			});

			if (!review) {
				req.flash('error', 'Review not found or unauthorized');
				return res.redirect('back');
			}

			req.flash('success', 'Review deleted successfully');
			return res.redirect('back');
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
};

module.exports = ReviewController;
