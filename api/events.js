const { db } = require('../index');
const { ObjectId } = require('mongodb');

const postEvent = async (req, res) => {
    let { name } = req.body;
    if (!name) return res.status(400).json({ error: "Enter Name" });

    let eventReference = await db.collection('Events').insertOne({
        name: name
    });
    let event = await db.createCollection(eventReference.insertedId.toString());
    let eventData = await event.find().toArray();

    if (!eventReference || !event || !eventData) return res.status(400).json({ error: 'Error Creating Event' });
    res.status(200).json(eventData);
}

const getEvent = async (req, res) => null;

module.exports = { postEvent, getEvent }