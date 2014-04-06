var mongoose = require('mongoose');
var database = process.env.MONGO_URL || 'mongodb://localhost/klickr';

var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect(database);
module.exports = db;