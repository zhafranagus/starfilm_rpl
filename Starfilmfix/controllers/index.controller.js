const axios = require('../config/axios');
const Review = require('../models/review');

const IndexController = {
	index: async (req, res) => {
		try {
			const [popular, playing] = await Promise.all([
				axios.get('/movie/popular'),
				axios.get('/movie/now_playing'),
			]);

			const reviews = await Review.find({
				movieId: {
					$in: [
						...popular.data.results.map((movie) => movie.id),
						...playing.data.results.map((movie) => movie.id),
					],
				},
			});

			popular.data.results = popular.data.results.map((movie) => ({
				...movie,
				score:
					reviews
						.filter((review) => Number(review.movieId) === movie.id)
						.reduce((acc, review, index, { length }) => acc + review.rating / length, 0) || 0,
			}));

			playing.data.results = playing.data.results.map((movie) => ({
				...movie,
				score:
					reviews
						.filter((review) => Number(review.movieId) === movie.id)
						.reduce((acc, review, index, { length }) => acc + review.rating / length, 0) || 0,
			}));

			return res.render('index', {
				popular: popular.data.results,
				playing: playing.data.results,
				error: req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
	about: async (req, res) => {
		try {
			return res.render('about', {
				error: req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
};

module.exports = IndexController;
