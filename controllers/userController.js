const mongo = require('../controllers/mongo.js');
const { model: todoModel } = require('../models/user.js');
const mongo = require('./mongo.js');
const  ObjectId = require('mongodb').ObjectId;

//needs name and id
const validateData = (data) => {
    if(Object.keys(data).length===1 && Object.keys(data)[0]==="name") return data;
    else throw new Error('invalid body');

}

module.exports.getAllUsers = async (req, res, next) => {
    // #swagger.description = 'get all the Users'
    // #swagger.tags = ['User']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.parameters['groupId'] = { description: 'The ID of the group to get all users from, Required' }
    /* #swagger.responses[200] = {
      description: 'Sends back array of users',
      schema: { $ref: '#/definitions/usersArray' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        const find = await col.find({}).toArray().catch(err => {throw new Error('error getting all users');});

        res.send(find);
    } catch (err) {next(err)}
    client.close();
}

module.exports.addNewUser = async (req, res, next) => {
    // #swagger.description = 'add a new User'
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Schema to add a new user',
            schema: { $ref: '#/definitions/addUser' }
    } */
    // #swagger.tags = ['User']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back new users data',
      schema: { $ref: '#/definitions/user' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        var newUser = validateData(req.body);

        newUser.createdDate = Date.now();

        const result = await col.insertOne(newUser).catch(err => {throw new Error('error adding user to MongoDB');});

        res.send(result.insertedId);
    } catch (err) {next(err)}
    client.close();
}

module.exports.updateUser = async (req, res, next) => {
    // #swagger.description = 'update a User'
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/editUser' }
    } */
    // #swagger.tags = ['User']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.parameters['userId'] = { description: 'The ID of the user to update' }
    /* #swagger.responses[200] = {
      description: 'Sends back updated users data',
      schema: { $ref: '#/definitions/user' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        const filter = { _id : ObjectId(req.params.userId)};

        //validate data
        if(Object.keys(req.body).length!==1 || !req.body.name) throw new Error('only the name is editable');

        var newData = req.body;

        const update = {
            $set: newData
        };

        const response = await col.updateOne(filter, update).catch(err => {throw new Error('error updating user');});

        res.status(200).send(response);
    } catch (err) {next(err)}
    client.close();
}

module.exports.deleteUser = async (req, res, next) => {
    // #swagger.description = 'delete a User'
    // #swagger.tags = ['User']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['userId'] = { description: 'The ID of the user to delete' }
    /* #swagger.responses[200] = {
      description: 'Sends back deleted users data',
      schema: { $ref: '#/definitions/user' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");
    
        const filter = {_id : ObjectId(req.params.userId)};
    
        const response = await col.deleteOne(filter).catch(err => {throw new Error('error deleting user');});
    
        res.status(200).send(response);
    } catch (err) {next(err)}
    client.close();
}

module.exports.getUserById = async (req, res, next) => {
    // #swagger.description = 'get a User by their Id'
    // #swagger.tags = ['User']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['userId'] = { description: 'The ID of the user to get' }
    /* #swagger.responses[200] = {
      description: 'Sends back users data',
      schema: { $ref: '#/definitions/user' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");
    
        const filter = {_id : ObjectId(req.params.userId)};

        const find = await col.find(filter).toArray().catch(err => {throw new Error('error getting user');});
    
        res.status(200).send(find);
    } catch (err) {next(err)}
    client.close();
}