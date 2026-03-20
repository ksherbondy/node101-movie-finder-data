<<<<<<< HEAD
const server = require('./app');

=======
// here we're importing your express app
const server = require('./app');

// We're telling the app to listen for network requests on port 3000
>>>>>>> 0877097fcc5c4e5bdff2e5338cad321dddcc38c3
server.listen(3000, function() {
  console.log('Server is listening on http://localhost:3000');
});
