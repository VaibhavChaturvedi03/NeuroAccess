const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../../config/environments/.env')
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neuroaccess',
  authMode: process.env.AUTH_MODE || 'anonymous',
  apiToken: process.env.API_TOKEN || '',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 120),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY || '',
  assemblyAiApiKey: process.env.ASSEMBLYAI_API_KEY || '',
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || ''
};

module.exports = env;
