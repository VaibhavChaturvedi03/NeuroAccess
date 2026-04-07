const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neuroaccess';

async function connectDatabase() {
  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
}

module.exports = {
  connectDatabase
};
