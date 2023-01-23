const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload');

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvoog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

  try {
    await client.connect();
    const database = client.db('bdgoDelivery');
    const ourServices = database.collection('services');
    const ordersCollection = database.collection('orders');
    const reviewCollection = database.collection('reviews');

    //Get Order by USER
    // app.get('/orders', async (req, res) => {

    // })

    //ORDER GET API O
    app.get('/orders', async (req, res) => {
      let query = {};
      const email = req.query.email;
      if (email) {
        query = { email: email };
      }
      const cursor = ordersCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    })

    app.post('/orders', async (req, res) => {
      console.log('body', req.body);
      console.log('files', req.files);
      res.json({ success: true })
    })
    //ORDER POST API
    // app.post('/orders', async (req, res) => {
    //     // order.createdAt = new Date(); //Added Date & id
    //     // const pic = req.files.image;
    //     // const picData = pic.data;
    //     // const encodedPic = picData.toString('base64');
    //     // const imageBuffer = Buffer.from(encodePic, 'base64');
    //     // const order = {
    //     //     body,
    //     //     image: imageBuffer
    //     // };
    //     // const result = await ordersCollection.insertOne(order);
    //     // res.json(result)
    // });
    //ORDER DELETE API
    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.json(result);
    })
    //Update Order
    app.put('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const updateStatus = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedStatus = {
        $set: {
          status: updateStatus.statusUpdate,
        },
      };
      const result = await ordersCollection.updateOne(
        filter,
        updatedStatus,
        options
      );
      res.json(result);
    });

    //SERVICES Get API 
    app.get('/services', async (req, res) => {
      const cursor = ourServices.find({});
      const services = await cursor.toArray();
      res.send(services);
    })
    //SERVICES Get Single Service
    app.get('/Services/:id', async (req, res) => {
      const id = req.params.id;
      console.log('getting specific Service', id);
      const query = { _id: ObjectId(id) };
      const service = await ourServices.findOne(query);
      res.json(service);
    })
    //SERVICES post API
    app.post('/services', async (req, res) => {
      const service = req.body;
      console.log('hit the Pots API', service);
      const result = await ourServices.insertOne(service);
      console.log(result);
      res.json(result)
    });
    //SERVICES DELETE Api
    app.delete('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ourServices.deleteOne(query);
      res.json(result);
    })

    //REVIEWS GET API
    app.get('/reviews', async (req, res) => {
      const cursor = reviewCollection.find({});
      const reviews = await cursor.toArray();
      res.send(reviews);
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
