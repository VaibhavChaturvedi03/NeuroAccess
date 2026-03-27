const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const requestContext = require('./middleware/request-context');
const apiRateLimiter = require('./middleware/rate-limit');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const v1Routes = require('./routes/v1');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestContext);
app.use(morgan('dev'));
app.use('/api', apiRateLimiter);

app.use('/api/v1', v1Routes);
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: 'neuroaccess-backend-api',
      version: '1.0.0'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
