const { db } = require('../index');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const postUser = async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;

    let collectionsList = (await db.listCollections().toArray()).map(e => e.name );
    if (!collectionsList.includes(id)) return res.status(400).json({ error: "Event Not Found" });

    if (req.headers.authorization) {
        let password = req.headers.authorization.split(' ').slice(1).join(' ');
        let salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(password, salt);
    } else {
        var hashedPassword = null;
    }

    let availability = [];
    let days = [];
    for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 96; y++) {
            days[y] = false;
        }
        availability[x] = days;
        days = [];
    }

    let event = await db.collection(id);
    
    let nameExists = await event.findOne({ name });
    if (nameExists) return res.status(400).json({ error: "Name Taken" });
    await event.insertOne({
        name,
        hashedPassword,
        availability
    });

    res.status(200).json({
        success: true,
        name
    });
};

const login = async (req, res) => {
    let { id } = req.params;
    let { name } = req.params;

    let collectionsList = (await db.listCollections().toArray()).map(e => e.name );
    if (!collectionsList.includes(id)) return res.status(400).json({ error: "Event Not Found" });

    let event = await db.collection(id);
    let { hashedPassword } = await event.findOne({ name });

    if (hashedPassword) {
        if (!req.headers.authorization) return res.status(400).json({ error: "Password Required" });

        let password = req.headers.authorization.split(' ').slice(1).join(' ');
        let correctPassword = await bcrypt.compare(password, hashedPassword);
        if (!correctPassword) return res.status(400).json({ error: "Incorrect Password" });
    }

    res.status(200).json({
        success: true,
        name
    });
};

const putUser = async (req, res) => {
    let { id } = req.params;
};

module.exports = { postUser, login, putUser }