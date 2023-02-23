const { connect, connection } = require('mongoose');

const connectionString =  'mongodb://127.0.0.1:27017/social-network-api';
// process.env.MONGODB_URI ||
// || 'mongodb://localhost/social-network-api'
// const connectionString = 'mongodb://localhost/social-network-api';
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;