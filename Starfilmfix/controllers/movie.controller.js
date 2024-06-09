const axios = require('../config/axios');
const Review = require('../models/review');

const MovieController = {
	index: async (req, res) => {
		try {
			const query = req.query.query;
			const page = req.query.page || 1;

			const { data } = query
				? await axios.get(`/search/movie?query=${query}&page=${page}`)
				: await axios.get('/movie/popular?page=' + page);

			const reviews = await Review.find({
				movieId: {
					$in: data.results.map((movie) => movie.id),
				},
			});

			data.results = data.results.map((movie) => ({
				...movie,
				score:
					reviews
						.filter((review) => Number(review.movieId) === movie.id)
						.reduce((acc, review, index, { length }) => acc + review.rating / length, 0) || 0,
			}));

			return res.render('movies/index', {
				movies: data,
				error: req.flash('error'),
				success: req.flash('success'),
				query: query || '',
			});
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
	show: async (req, res) => {
		try {
			const { id } = req.params;
			const { data } = await axios.get(`movie/${id}`);
			const reviews = await Review.find({ movieId: id }).populate('user', '-password');

			return res.render('movies/show', {
				movie: data,
				error: req.flash('error'),
				success: req.flash('success'),
				user: req.user,
				reviews: reviews || [],
			});
		} catch (error) {
			req.flash('error', error.message);
			return res.redirect('back');
		}
	},
};

module.exports = MovieController;
