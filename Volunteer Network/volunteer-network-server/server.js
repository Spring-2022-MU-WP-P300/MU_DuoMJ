const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { ObjectID } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => res.send("Volunteer Network Server is running"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm2i5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("volunteer_network");
    const eventCollection = database.collection("events");

    //post an event , get events, get particular event by id ,delete particular event by id, update particular event by id
    app
      .post("/events", async (req, res) => {
        const event = req.body;
        const result = await eventCollection.insertOne(event);
        res.send(result);
      })
      .get("/events", async (req, res) => {
        const events = await eventCollection.find().toArray();
        res.send(events);
      })
      .get("/events/:id", async (req, res) => {
        const event = await eventCollection.findOne({
          _id: ObjectID(req.params.id),
        });
        res.send(event);
      })
      .delete("/events/:id", async (req, res) => {
        const event = await eventCollection.deleteOne({
          _id: ObjectID(req.params.id),
        });
        res.send(event);
      })
      .patch("/events/:id", async (req, res) => {
        const exist = await eventCollection.findOne({
          _id: ObjectID(req.params.id),
        });
        if (exist) {
          const result = await eventCollection.updateOne(
            { _id: ObjectID(req.params.id) },
            { $set: req.body }
          );
          res.send(result);
        } else res.status(404).send("Event not found!");
      });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`Server is running on port ${port}`));
