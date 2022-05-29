const mongo = require('./mongo.js');
const {model:todoModel} = require('../models/todo.js');
const  ObjectId = require('mongodb').ObjectId;

const validateData = (data) => {
    var newDoc = {};
    Object.keys(data).forEach(entryItemKey => {
        if(!todoModel[entryItemKey]) throw new Error(`${entryItemKey} is not a valid entry`);
        if(!todoModel[entryItemKey].editable) throw new Error(`${entryItemKey} is not editable`);

        if(entryItemKey==='comment'){
            newDoc.feed = new Array(data[entryItemKey]);
            return;
        }

        newDoc[entryItemKey] = data[entryItemKey];
    });
    return newDoc;
}


module.exports.getAllTodos = async (req, res, next) => {
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("todos");

        const find = await col.find({}).toArray().catch(err => {throw new Error('error getting all todos');});

        res.send(find);
    } catch (err) {next(err)}
    client.close();
}

module.exports.addNewTodo = async (req, res, next) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addTodo' }
    } */
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("todos");

        var newDoc = validateData(req.body);

        newDoc.createdDate = Date.now();
        newDoc.creator = req.session?.name || "Calvin"; //TODO session/logins isn't set up yet

        const result = await col.insertOne(newDoc).catch(err => {throw new Error('error adding todo to MongoDB');});

        res.send(result.insertedId);
    } catch (err) {next(err)}
    client.close();
}

module.exports.updateTodo = async (req, res, next) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/editTodo' }
    } */
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("todos");

        const filter = { _id : ObjectId(req.params.docID)};

        var newData = validateData(req.body);
        const comments = newData.feed[0];
        delete newData.feed;

        const update = {
            $set: newData,
            $push: {"feed": comments}
        };

        const response = await col.updateOne(filter, update).catch(err => {throw new Error('error updating todo');});

        //TODO: now that we have the ticket, send another update to add to the feed.

        res.status(200).send(response);
    } catch (err) {next(err)}
    client.close();
}

module.exports.deleteTodo = async (req, res, next) => {
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("todos");
    
        const filter = {_id : ObjectId(req.params.docID)};
    
        const response = await col.deleteOne(filter).catch(err => {throw new Error('error deleting todo');});
    
        res.status(200).send(response);
    } catch (err) {next(err)}
    client.close();
}