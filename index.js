const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cidqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log("server connected");
        const database = client.db('personalDatabase');
        const newsCollection = database.collection('news');

        app.get('/news', async (req, res) => {
            const cursor = newsCollection.find({});
            const news = await cursor.toArray();
            res.json(news);
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Practice Server Is Running")
})

app.listen(port, () => {
    console.log("Practice Server Is Running at Port", port);
})