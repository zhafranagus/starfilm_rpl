const base = require('axios');

const axios = base.create({
	baseURL: process.env.TMDB_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	params: {
		api_key: process.env.TMDB_API_KEY,
	},
});

module.exports = axios;
