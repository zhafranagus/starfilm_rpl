const User = require('../models/user');

const register = async (req, res) => {
	try {
		const { username, password, fullname } = req.body;
		if (!username || !password || !fullname) {
			req.flash('error', 'Username, password and fullname are required');
			return res.redirect('back');
		}

		const user = await User.findOne({ username });
		if (user) {
			req.flash('error', 'Username already taken');
			return res.redirect('back');
		}

		await User.create({
			username,
			password,
			fullname,
		});

		req.flash('success', 'Registration successful');
		return res.redirect('/auth/login');
	} catch (error) {
		req.flash('error', error.message);
		return res.redirect('back');
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			req.flash('error', 'Username and password are required');
			return res.redirect('back');
		}

		const user = await User.findOne({ username });
		if (!user) {
			req.flash('error', 'Invalid username or password');
			return res.redirect('back');
		}

		if (!user.comparePassword(password)) {
			req.flash('error', 'Invalid username or password');
			return res.redirect('back');
		}

		req.session.passport = { user: user.id };

		req.flash('success', 'Logged in successfully');
		return res.redirect('/');
	} catch (error) {
		req.flash('error', error.message);
		return res.redirect('back');
	}
};

const logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
};

module.exports = {
	register,
	login,
	logout,
};
