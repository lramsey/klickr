var app = require('./server-config.js');

var hostname = process.env.HOSTNAME || '127.0.0.1';
var port = process.env.KLICKR_PORT || 4568;

app.listen(port, hostname);

console.log('Server now listening on port ' + port);