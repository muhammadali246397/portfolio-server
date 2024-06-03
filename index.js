const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = 3000

app.use(express.json());
app.use(cors());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_usER}:${process.env.db_PasS}@cluster0.rfaan6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db('juwel-portfolio')
        const projectCollection = database.collection('projectCollection')
        const admin = database.collection('admin')
       

        app.post('/project', async (req, res) => {
            const data = req.body
            const result = await projectCollection.insertOne(data)
            res.send(result)
            console.log(result)
        })
        app.get('/projects',async(req,res) =>{
            const result = await projectCollection.find().toArray()
            res.send(result)
        })
        
        app.get('/admin',async(req,res) => {
            const result = await admin.findOne(admin)
            res.send(result)
        })

        


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})