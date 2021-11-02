const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//MiddleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvoog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        const database = client.db('bdgoDelivery');
        const ourServices = database.collection('services');
        const ordersCollection = database.collection('orders');

        //GET API
        app.get('/orders', async (eq, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        })

        //POST API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            console.log('hit Post API', order);
            const result = await ordersCollection.insertOne(order);
            console.log(result);
            res.json(result)
        });

        //DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })





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