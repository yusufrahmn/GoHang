const { db } = require('../index');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// Authentication Function

const auth = async (req, res) => {
    let { id, name } = req.params;

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

    return true;
}

// Data Validation

function validateData(matrix){
    if (matrix.length != 7) return false;
    else {
        for (let x = 0; XMLHttpRequestUpload < matrix.length; x++) { if(matrix[x].length != 96) return false; 
            else {
                for (let i = 0; i < 96; i++) { if (typeof matrix[x][i] != 'boolean') return false; }
            }
        }
        return true;
    }
}

// POST Request / New User

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

// GET Request / Login

const login = async (req, res) => {
    await auth(req, res);

    res.status(200).json({
        success: true,
        name: req.params.name
    });
};

//  Put Request / Update Availability

const putUser = async (req, res) => {
    let { id, name } = req.params;
    let { availability } = req.body;

    let authenticated = await auth(req, res);
    if (!authenticated) return;
    if (!availability || !validateData(availability)) return res.status(400).json({ error: "Invalid Data" });


    let event = await db.collection(id);
    await event.updateOne({ name }, {
        $set: {
            availability
        }
    });

    res.status(200).json({
        success: true,
        name
    });
};

module.exports = { postUser, login, putUser }