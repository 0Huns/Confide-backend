const { MongoClient } = require('mongodb');
require('dotenv').config();

const URI = process.env.URI;
const client = new MongoClient(URI);

let db;

const connectDB = async () => {
  try{
    await client.connect();
    db = client.db('forum');
    console.log('Connected to MongoDB');
  }
  catch(err){
    console.log(err)
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };