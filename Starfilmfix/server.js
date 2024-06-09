require('dotenv').config();

const path = require('path');
const express = require('express');
const override = require('method-override');
const session = require('express-session');
const store = require('connect-mongo');
const morgan = require('morgan');
const flash = require('connect-flash');

const Guard = require('./middlewares/auth');
const passport = require('./config/passport');
const connecting = require('./config/mongoose');

const reloader = require('livereload');
const connector = require('connect-livereload');

const app = express();
connecting();

const PORT = process.env.PORT || 3000;
const HOST = process.env.DOMAIN || 'localhost';

app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		store: store.create({
			mongoUrl: process.env.MONGO_URI,
		}),
	})
);

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override('_method'));
app.use(express.static('public'));

app.use(flash());
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
	console.log('Development mode');

	const reload = reloader.createServer();
	reload.server.once('connection', () => {
		setTimeout(() => {
			reload.refresh('/');
		}, 100);
	});

	reload.watch('public');
	reload.watch('views');
	app.use(connector());
}

app.use('/auth', require('./routes/auth.route'));

app.use(Guard.authenticated);
app.use('/', require('./routes/index.route'));
app.use('/users', require('./routes/user.route'));
app.use('/movies', require('./routes/movie.route'));
app.use('/reviews', require('./routes/review.route'));

app.all('*', (req, res, next) => {
	res.render('errors/404');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.render('errors/505');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});
