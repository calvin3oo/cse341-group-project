const mongo = require('../controllers/mongo.js');
const { model: groupModel } = require('../models/group.js');
const  ObjectId = require('mongodb').ObjectId;

const validateData = (data) => {
  var newDoc = {};
  Object.keys(data).forEach(key => {
      if (!groupModel[key]) throw new Error(`${key} is not a valid entry`);
      if (!groupModel[key].editable) throw new Error(`${key} is not editable`);

      if (key === 'comment') {
          newDoc.feed = new Array(data[key]);
          return;
      }

      newDoc[key] = data[key];
  });
  return newDoc;
}

module.exports.getAllGroups = async (req, res, next) => {
    // #swagger.description = 'get All Groups'
    // #swagger.tags = ['Group']
    // #swagger.produces = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back array of groups',
      schema: { $ref: '#/definitions/groupsArray' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 

    var client;
    try {
        //make connection to mongodb
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("group");

        const find = await col.find({}).toArray().catch(err => { throw new Error('error getting all groups'); });

        res.send(find);
    } catch (err) { next(err) }
    client.close();

}
module.exports.getGroup = async (req, res, next) => {
    // #swagger.description = 'get Group by Id'
    // #swagger.tags = ['Group']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['groupId'] = { description: 'The Group ID' }
    /* #swagger.responses[200] = {
      description: 'Sends back group data',
      schema: { $ref: '#/definitions/group' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try {
        //make mongodb connection
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("group");

        //define filter
        const filter = { _id: ObjectId(req.params.groupId) };

        const response = await col.find(filter).catch(err => { throw new Error('error finding that group'); });

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}
module.exports.addNewGroup = async (req, res, next) => {
    // #swagger.description = 'add a new Group'
    // #swagger.tags = ['Group']
    // #swagger.consumes = ['application/json']
    // #swagger.produces = ['application/json']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addGroup' }
    } */
    /* #swagger.responses[200] = {
      description: 'Sends back added groups data',
      schema: { $ref: '#/definitions/group' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 

    var client;
    try {
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("group");

        var newDoc = validateData(req.body);

        newDoc.createdDate = Date.now();
        newDoc.creator = req.session?.name || "Calvin"; //TODO session/logins isn't set up yet

        const result = await col.insertOne(newDoc).catch(err => { throw new Error('error adding group to MongoDB'); });

        res.send(result.insertedId);
    } catch (err) { next(err) }
    client.close();
}
module.exports.updateGroup = async (req, res, next) => {
    // #swagger.description = 'update a Group'
    // #swagger.tags = ['Group']
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.parameters['groupId'] = { description: 'The Group ID' }
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/updateGroup' }
    } */
    /* #swagger.responses[200] = {
      description: 'Sends back updated groups data',
      schema: { $ref: '#/definitions/group' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 

    var client;
    try {
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("group");

        const filter = { _id: ObjectId(req.params.groupId) };

        var newData = validateData(req.body);
        const comments = newData.feed[0];
        delete newData.feed;

        const update = {
            $set: newData,
            $push: { "feed": comments }
        };

        const response = await col.updateOne(filter, update).catch(err => { throw new Error('error updating group'); });

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}
module.exports.deleteGroup = async (req, res, next) => {
    // #swagger.description = 'delete a Group'
    // #swagger.tags = ['Group']
    // #swagger.produces = ['application/json']
    // #swagger.parameters['groupId'] = { description: 'The Group ID' }
    /* #swagger.responses[200] = {
      description: 'Sends back deleted groups data',
      schema: { $ref: '#/definitions/group' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
    var client;
    try {
        //make mongodb connection
        client = await mongo.connectToMongoDB().catch(err => { throw new Error('error connecting to MongoDB'); });
        const col = client.db("cse341-w5").collection("group");

        //define filter
        const filter = { _id: ObjectId(req.params.groupId) };

        const response = await col.deleteOne(filter).catch(err => { throw new Error('error deleting the group'); });

        res.status(200).send(response);
    } catch (err) { next(err) }
    client.close();
}