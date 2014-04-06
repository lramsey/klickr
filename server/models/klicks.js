var mongoose = require('mongoose');

var klicksSchema = new mongoose.Schema({
  klicks: [{
    a: String,
    x: Number,
    y: Number,
    t: Date
  }],
  url: String
});

// keystrokeSchema.methods.initialize = function () {

// };

module.exports = mongoose.model('Klicks', klicksSchema);