const mongo = require('../controllers/mongo.js');
const { model: todoModel } = require('../models/todo.js');
const ObjectId = require('mongodb').ObjectId;

const validateData = (data) => {
    var newDoc = {};
    Object.keys(data).forEach(key => {
        if (!todoModel[key]) throw new Error(`${key} is not a valid entry`);
        if (!todoModel[key].editable) throw new Error(`${key} is not editable`);

        if (key === 'comment') {
            newDoc.feed = new Array(data[key]);
            return;
        }

        newDoc[key] = data[key];
    });
    return newDoc;
}


module.exports.getAllTodos = async (req, res, next) => {
    // #swagger.description = 'get all todos'
    // #swagger.tags = ['Todo']
    // #swagger.produces = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back array of all todos',
      schema: { $ref: '#/definitions/todosArray' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try {
        //make connection to mongodb
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("todos");

        const find = await col.find({}).toArray().catch(err => { throw new Error('error getting all todos'); });

        res.send(find);
    } catch (err) { next(err) }
    client.close();
}
module.exports.getTodoById = async (req, res, next) => {
    // #swagger.description = 'get a specific todo by id'
    // #swagger.tags = ['Todo']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['todoId'] = { description: 'The todo ID' }
    /* #swagger.responses[200] = {
      description: 'Sends back todo data',
      schema: { $ref: '#/definitions/todo' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'}
    var client;
    try {
        //make mongodb connection
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("todos");

        //define filter
        const filter = { _id: ObjectId(req.params.todoId) };

        const response = await col.findOne(filter);

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}

module.exports.addNewTodo = async (req, res, next) => {
    // #swagger.description = 'create a new todos'
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addTodo' }
    } */
    // #swagger.tags = ['Todo']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back created todos data',
      schema: { $ref: '#/definitions/todo' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'}
    var client;
    try {
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("todos");

        var newDoc = validateData(req.body);

        newDoc.createdDate = Date.now();
        newDoc.creator = req.session?.name || "Calvin"; //TODO session/logins isn't set up yet

        const result = await col.insertOne(newDoc).catch(err => { throw new Error('error adding todo to MongoDB'); });

        res.send(result.insertedId);
    } catch (err) { next(err) }
    client.close();
}

module.exports.updateTodo = async (req, res, next) => {
    // #swagger.description = 'update a todo'
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/editTodo' }
    } */
    // #swagger.tags = ['Todo']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.parameters['todoId'] = { description: 'The todo ID' }
    /* #swagger.responses[200] = {
      description: 'Sends back updated todos data',
      schema: { $ref: '#/definitions/todo' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'}
    var client;
    try {
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("todos");

        const filter = { _id: ObjectId(req.params.todoId) };

        var newData = validateData(req.body);
        const comments = newData.feed?.[0];
        delete newData.feed;

        const update = {
            $set: newData,
            $push: { "feed": comments }
        };

        const response = await col.updateOne(filter, update).catch(err => { throw new Error('error updating todo'); });

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}

module.exports.deleteTodo = async (req, res, next) => {
    // #swagger.description = 'delete a todo'
    // #swagger.tags = ['Todo']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['todoId'] = { description: 'The todo ID' }
    /* #swagger.responses[200] = {
      description: 'Sends back deleted todos data',
      schema: { $ref: '#/definitions/todo' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'}
    var client;
    console.log('deleting todo', req.params.todoId);
    try {
        //make mongodb connection
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("todos");

        //define filter
        const filter = { _id: ObjectId(req.params.todoId) };

        const response = await col.deleteOne(filter).catch(err => { throw new Error('error deleting todo'); });

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}