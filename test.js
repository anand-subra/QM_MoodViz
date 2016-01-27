
// client
var s = require('net').Socket();
s.connect(12345);
s.write('Whatup');
s.end();
