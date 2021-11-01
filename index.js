const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

//MiddleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvoog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('bdgoDelivery');

        //Services Database
        const ourServices = database.collection('services');
        // Get API 
        app.get('/services', async (req, res) => {
            const cursor = ourServices.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
        //Get Single Service
        app.get('/Services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific Service', id);
            const query = { _id: ObjectId(id) };
            const service = await ourServices.findOne(query);
            res.json(service);
        })
        //post API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the Pots API', service);
            const result = await ourServices.insertOne(service);
            console.log(result);
            res.json(result)
        });
        //DELETE Api
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ourServices.deleteOne(query);
            res.json(result);
        })

        //Order Database
        const newOrder = database.collection('order');
        //Get API
        app.get('/O', async (req, res) => {
            const cursor = ourServices.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})