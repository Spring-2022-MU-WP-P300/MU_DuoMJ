const express= require('express');
const app = express();
const cors = require('cors');
const {MongoClient} = require('mongodb');
const {ObjectID} = require('mongodb');
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/",(req,res)=>res.send("Volunteer Network Server is running"));
app.listen(port,()=>console.log(`Server is running on port ${port}`));