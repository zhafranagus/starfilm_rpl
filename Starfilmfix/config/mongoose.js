const mongoose = require('mongoose');

function connecting() {
	mongoose.set('strictQuery', true);
	mongoose.connect(process.env.MONGO_URI);

	const connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection error:'));
	connection.once('open', function () {
		console.log('Database is connected on ' + process.env.MONGO_URI);
	});
}

module.exports = connecting;
