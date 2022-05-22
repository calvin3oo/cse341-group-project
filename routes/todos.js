const express = require('express');
const router = express.Router();
const mongo = require('../controllers/mongo.js');
const  ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341-w5").collection("todos");

    const find = await col.find({}).toArray();

    res.send(find);
    client.close();
});

router.post('/', async (req, res) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addTodo' }
    } */
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341-w5").collection("todos");
    var newDoc = {};

    entrys.forEach(entry => {
        newDoc[entry.name] = req.body[entry.name];
    });

    const result = await col.insertOne(newDoc);

    res.send(result.insertedId);
    client.close();
});

module.exports = router;