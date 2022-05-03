const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleWare
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ivf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        // Best Deals in Database
        const BestDealsCollection = client.db("BestDeals").collection('BestDealsCar');
        // Brands Icon in Database
        const BrandsCollection = client.db("Brands").collection('BrandsIcon');


        // Show Brands Icon
        app.get('/viewBrands', async (req, res) => {
            const query = {};
            const cursor = BrandsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })


        // Show Best Deals Car
        app.get('/viewCar', async (req, res) => {
            const query = {};
            const cursor = BestDealsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log("success", port)
})