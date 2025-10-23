const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// Replace <db_password> with your actual password
const uri = "mongodb+srv://b00157129_db_user:<Bula2cao*>@cluster0.hetflnn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("carpool"); // your database name
    const ridesCollection = db.collection("rides"); // collection for rides

    // GET all rides
    app.get('/rides', async (req, res) => {
      const rides = await ridesCollection.find({}).toArray();
      res.json(rides);
    });

    // POST a new ride
    app.post('/rides', async (req, res) => {
      const newRide = req.body;
      const result = await ridesCollection.insertOne(newRide);
      res.json(result);
    });

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
