import { connectToDatabase } from './mongodb';

export default async function getChatHistory(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await connectToDatabase();
      const db = client.db('chat_database');
      const collection = db.collection('chat_messages');

      const chats = await collection.find().sort({ timestamp: -1 }).limit(50).toArray();

      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}