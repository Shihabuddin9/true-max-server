const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        //get Best Deals in Database
        const BestDealsCollection = client.db("BestDeals").collection('BestDealsCar');
        //get Brands Icon in Database
        const BrandsCollection = client.db("Brands").collection('BrandsIcon');
        //get Trusted Dealers company in Database
        const TrustedDealersCollection = client.db("TrustedDealers").collection('TrustedDealersIcon');
        //get Body Type car in Database
        const BodyTypeCarCollection = client.db("BodyType").collection('BodyTypeCar');
        //get Latest car in database
        const LatestCarCollection = client.db("Latest").collection('LatestCar');



        //Show Brands Icon in Home page
        app.get('/viewBrands', async (req, res) => {
            const query = {};
            const cursor = BrandsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })


        // Show Best Deals Car in Home page
        app.get('/viewCar', async (req, res) => {
            const query = {};
            const cursor = BestDealsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // Show Best Deals Car Details in other page
        app.get('/viewCar/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const viewCar = await BestDealsCollection.findOne(query);
            res.send(viewCar);
        })

        //Show Trusted Dealers Icon in Home page
        app.get('/trustedDealers', async (req, res) => {
            const query = {};
            const cursor = TrustedDealersCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        // Show Body Type Car module in Home page
        app.get('/bodyTypeCar', async (req, res) => {
            const query = {};
            const cursor = BodyTypeCarCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        // Show Latest Car in Home page
        app.get('/LatestCar', async (req, res) => {
            const query = {};
            const cursor = LatestCarCollection.find(query);
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