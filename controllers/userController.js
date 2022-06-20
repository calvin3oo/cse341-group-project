const mongo = require('./mongo.js');
const  ObjectId = require('mongodb').ObjectId;

//needs name and id
const validateData = (data) => {
    var hasId = false;
    var hasName = false;
    //needs only id and username
    Object.keys(data).forEach(key => {
        if(key!=='id' && key!=='name') throw new Error('invalid entry key');
        else if(key==='id') hasId = true;
        else if(key==='name') hasName = true;
    })

    if(hasId && hasName) return data;
    else throw new Error('not enough entries, need id and username');

}

module.exports.getAllUsers = async (req, res, next) => {
    // #swagger.tags = ['Users']
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
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addUser' }
    } */
    // #swagger.tags = ['Users']
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        var newUser = validateData(req.body);

        const filter = { id : req.body.id};
        const find = await col.find(filter).toArray().catch(err => {throw new Error('error getting user');});
        if(find.length !== 0) throw new Error('User with id already exists');

        newUser.createdDate = Date.now();

        const result = await col.insertOne(newUser).catch(err => {throw new Error('error adding user to MongoDB');});

        res.send(result.insertedId);
    } catch (err) {next(err)}
    client.close();
}

module.exports.updateUser = async (req, res, next) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/editUser' }
    } */
    // #swagger.tags = ['Users']
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        const filter = { id : req.params.userId};

        //validate data
        if(req.body.length!==1 || !req.body.name) throw new Error('only the name is editable');

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
    // #swagger.tags = ['Users']
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");
    
        const filter = {id : req.params.userId};
    
        const response = await col.deleteOne(filter).catch(err => {throw new Error('error deleting user');});
    
        res.status(200).send(response);
    } catch (err) {next(err)}
    client.close();
}

module.exports.getUserById = async (req, res, next) => {
    // #swagger.tags = ['Users']
    var client;
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");
    
        const filter = {id : req.params.userId};

        const find = await col.find(filter).toArray().catch(err => {throw new Error('error getting user');});
    
        res.status(200).send(find);
    } catch (err) {next(err)}
    client.close();
}