import { connectToDatabase } from './mongodb';

export default async function storeChatMessage(req, res) {
  if (req.method === 'POST') {
    const { user, message } = req.body;

    if (!user || !message) {
      return res.status(400).json({ error: 'User and message are required' });
    }

    try {
      const client = await connectToDatabase();
      const db = client.db('chat_database');
      const collection = db.collection('chat_messages');

      await collection.insertOne({ user, message, timestamp: new Date() });

      res.status(200).json({ message: 'Chat stored successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store chat' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}