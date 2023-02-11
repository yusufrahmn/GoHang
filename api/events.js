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

const getEvent = async (req, res) => {
    let { id } = req.params;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    let collectionsList = (await db.listCollections().toArray()).map(e => e.name );
    if (!collectionsList.includes(id)) return res.status(400).json({ error: "Event Not Found" });

    let { name } = await db.collection('Events').findOne({ _id: new ObjectId(id) });
    if (!name) return res.status(400).json({ error: "Event Not Found" });

    let event = await db.collection(id);
    let eventData = await event.find({}, { hashedPassword: 0 }).toArray();

    res.status(200).json({
        name,
        data: eventData
    });
};

module.exports = { postEvent, getEvent }