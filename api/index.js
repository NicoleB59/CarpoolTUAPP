const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI (replace password if needed)
// const uri = "mongodb+srv://b00157129_db_user:Bula1384cao@cluster0.hetflnn.mongodb.net/?appName=Cluster0";
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is missing in production!");
} else {
  console.log("✅ MONGODB_URI loaded");
}

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

    const db = client.db("CarpoolTU"); 
    const usersCollection = db.collection("user"); // collection for registered users
    const searchesCollection = db.collection("searches"); // collection for search entries
    const loginusersCollection = db.collection("loginUser"); // collection for logged in users

    // LOGIN ROUTE
    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await usersCollection.findOne({ email });

        // 2. If no user found
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Check password
        if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 4. Save login record
        await loginusersCollection.insertOne({
          userId: user._id,
          email: user.email,
          loginAt: new Date(),
        });

        // 5. Respond success
        res.status(200).json({ message: 'Login successful!' });

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during login' });
      }
    });


    // REISTER ROUTE
    app.post('/register', async (req, res) => {
      try {
        const newUser = req.body; // { name, email, phone, password }
        await usersCollection.insertOne(newUser);

        console.log('New user registered:', newUser); // shows in terminal
        res.json({ message: 'User registered successfully!' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
      }
    });

    // SEARCH ROUTE
    app.post('/search', async (req, res) => {
      try {
        const { leavingFrom, goingTo, passenger, time } = req.body;

        // Insert the search data into MongoDB
        await searchesCollection.insertOne({ leavingFrom, goingTo, passenger, time, createdAt: new Date() });

        console.log('🔍 New search entry:', { leavingFrom, goingTo, passenger, time });
        res.json({ message: 'Search details saved successfully!' });
      } catch (err) {
        console.error('❌ Error saving search data:', err);
        res.status(500).json({ message: 'Error saving search data' });
      }
    });

    // PROFILE ROUTE
    app.get('/profile', async (req, res) => {
      try {
        const { email } = req.query;

        const user = await usersCollection.findOne(
          { email },
          { projection: { password: 0 } } // hide password
        );

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching profile' });
      }
    });


    // // START SERVER
    // const PORT = 5000;
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    module.exports = app;

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
