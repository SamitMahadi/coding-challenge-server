const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


const app = express();

//middleware//
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://coding01:Dmfa47eMXO1qOUl3@cluster0.0ovpnih.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const CodingCollection = client.db('CodingChallenge').collection('booking');

        app.get('/booking', async (req, res) => {
            const query = {};
            const bookings = await CodingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.post('/booking', async (req, res) => {
            const booking = req.body
            const result = await CodingCollection.insertOne(booking);
            res.send(result)
        })

        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await CodingCollection.deleteOne(filter);
            res.send(result);
        })



    }
    finally {

    }

}
run().catch(console.log)




app.get('/', async (req, res) => {
    res.send('code challenge server is running')
})

app.listen(port, () => console.log(`code challenge running on ${port}`))