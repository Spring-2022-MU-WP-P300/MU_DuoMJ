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
    const registeredCollection = database.collection("registered");
    const userCollection = database.collection("users");

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

    //post registration info, get all registration info, get particular registration info by emailId ,delete particular registration by id
    app
      .post("/registeredInfo", async (req, res) => {
        const registeredInfo = req.body;
        const result = await registeredCollection.insertOne(registeredInfo);
        res.send(result);
      })
      .get("/registeredInfo", async (req, res) => {
        const result = await registeredCollection.find({}).toArray();
        res.send(result);
      })
      .get("/registeredInfo/:emailId", async (req, res) => {
        const result = await registeredCollection.findOne({
          email: req.params.emailId,
        });
        res.send(result);
      })
      .delete("/registeredInfo/:id", async (req, res) => {
        const result = await registeredCollection.deleteOne({
          _id: ObjectID(req.params.id),
        });
        res.send(result);
      });

    //post user , get users,get particular user by emailId,replace firebase google signIn or github signIn userInfo,role play updating for admin,get admin by emailId
    app
      .post("/users", async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      })
      .get("/users", async (req, res) => {
        const result = await userCollection.find({}).toArray();
        res.send(result);
      })
      .get("/users/:emailId", async (req, res) => {
        const result = await userCollection.findOne({
          email: req.params.emailId,
        });
        res.send(result);
      })
      .put("/users", async (req, res) => {
        const result = await userCollection.updateOne(
          { email: req.body.email },
          { $set: req.body },
          { upsert: true }
        );
        res.send(result);
      })
      .put("/users/admin", async (req, res) => {
        const result = await userCollection.updateOne(
          { email: req.body.email },
          { $set: { role: "admin" } },
          { upsert: true }
        );
        res.send(result);
      })
      .get("/users/admin/:emailId", async (req, res) => {
        const result = await userCollection.findOne({
          email: req.params.emailId,
          role: "admin",
        });
        if (result) res.send({ admin: true });
        else res.send({ admin: false });
      });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`Server is running on port ${port}`));
