require('dotenv').config();

const app = require('./app');
const { connectDatabase } = require('./config/database');

const port = Number(process.env.PORT || 8080);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`NeuroAccess backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

startServer();
