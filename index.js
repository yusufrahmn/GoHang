const dotenv = require('dotenv').config();

// Mongo

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongo.connect();

const db = mongo.db('Events');
module.exports.db = db;

// Express and Stuff

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Back End

const { postEvent, getEvent } = require('./api/events');

app.post('/api/events', postEvent);
app.get('/api/events/:id', getEvent);

const { postUser, login, putUser } = require('./api/users');

app.post('/api/events/:id/user', postUser);
app.get('/api/events/:id/user/:name', login);
app.put('/api/events/:id/user/:name', putUser);


// Front End


app.listen(443, () => {
    console.log('✅ 🫂 GoHang is now live on port 443!');
});