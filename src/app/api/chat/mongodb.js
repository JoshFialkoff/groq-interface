const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;  // Loaded from environment variables

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  cachedClient = await client.connect();
  return cachedClient;
}

module.exports = { connectToDatabase };