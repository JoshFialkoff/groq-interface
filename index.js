const { MongoClient } = require('mongodb');
const { Vercel } = require('vercel');

const url = 'mongodb://admin:91af788beaff373766b1@vercel-vmongo-mongoexpress.pf3dwk.easypanel.host:27017';
const client = new MongoClient(url);

client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const db = client.db('vercel_chats');
const chats = db.collection('chats');

const api = new Vercel();

api.route('/api/chats', 'POST', (req, res) => {
  const chatMessage = req.body;
  chats.insertOne(chatMessage)
    .then((result) => res.json({ message: 'Chat message inserted' }));
});

api.route('/api/chats', 'GET', (req, res) => {
  chats.find({}).toArray()
    .then((chats) => res.json(chats));
});