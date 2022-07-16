const mongo = require("../controllers/mongo.js");
const { model: companyModel } = require("../models/company.js");
const ObjectId = require("mongodb").ObjectId;

const validateData = (data) => {
  var newDoc = {};
  Object.keys(data).forEach((key) => {
    if (!companyModel[key]) throw new Error(`${key} is not a valid entry`);
    if (!companyModel[key].editable) throw new Error(`${key} is not editable`);

    if (key === "comment") {
      newDoc.feed = new Array(data[key]);
      return;
    }

    newDoc[key] = data[key];
  });
  return newDoc;
};

module.exports.getAllCompanies = async (req, res, next) => {
  // #swagger.description = 'get All Companies'
  // #swagger.tags = ['Company']
  // #swagger.produces = ['application/json']
  /* #swagger.responses[200] = {
      description: 'Sends back array of companies',
      schema: { $ref: '#/definitions/companiesArray' }
    } */
  // #swagger.responses[400] = { description: 'Invalid Request'}
  var client;
  try {
    //make connection to mongodb
    client = await mongo.connectToMongoDB().catch((err) => {
      throw new Error("error connecting to MongoDB");
    });
    const col = client.db("cse341-w5").collection("company");

    const find = await col
      .find({})
      .toArray()
      .catch((err) => {
        throw new Error("error getting all companies");
      });

    res.send(find);
  } catch (err) {
    next(err);
  }
  client.close();
};

module.exports.getCompany = async (req, res, next) => {
  // #swagger.description = 'get Company by Id'
  // #swagger.tags = ['Company']
  // #swagger.produces = ['application/json']
  // #swagger.parameters['companyId'] = { description: 'The Company ID' }
  /* #swagger.responses[200] = {
      description: 'Sends back company data',
      schema: { $ref: '#/definitions/company' }
    } */
  // #swagger.responses[400] = { description: 'Invalid Request'}
  var client;
  try {
    //make mongodb connection
    client = await mongo.connectToMongoDB().catch((err) => {
      throw new Error("error connecting to MongoDB");
    });
    const col = client.db("cse341-w5").collection("company");

    //define filter
    const filter = { _id: ObjectId(req.params.companyId) };

    const response = await col.findOne(filter);

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
  client.close();
};

module.exports.addNewCompany = async (req, res, next) => {
  // #swagger.description = 'add a new Company'
  // #swagger.tags = ['Company']
  // #swagger.consumes = ['application/json']getCompany
  // #swagger.produces = ['application/json']
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addCompany' }
    } */
  /* #swagger.responses[200] = {
      description: 'Sends back the created companies data',
      schema: { $ref: '#/definitions/company' }
    } */
  // #swagger.responses[400] = { description: 'Invalid Request'}
  var client;
  try {
    client = await mongo.connectToMongoDB().catch((err) => {
      throw new Error("error connecting to MongoDB");
    });
    const col = client.db("cse341-w5").collection("company");

    var newDoc = validateData(req.body);

    newDoc.createdDate = Date.now();
    newDoc.creator = req.session?.name || "Calvin"; //TODO session/logins isn't set up yet

    const result = await col.insertOne(newDoc).catch((err) => {
      throw new Error("error adding company to MongoDB");
    });

    res.send(result.insertedId);
  } catch (err) {
    next(err);
  }
  client.close();
};

module.exports.updateCompany = async (req, res, next) => {
  // #swagger.description = 'update a Company'
  // #swagger.tags = ['Company']
  // #swagger.produces = ['application/json']
  // #swagger.consumes = ['application/json']
  // #swagger.parameters['companyId'] = { description: 'The Company ID' }
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/updateCompany' }
    } */
  /* #swagger.responses[200] = {
      description: 'Sends back the updated companies data',
      schema: { $ref: '#/definitions/company' }
    } */
  // #swagger.responses[400] = { description: 'Invalid Request'}
  var client;
  try {
    client = await mongo.connectToMongoDB().catch((err) => {
      throw new Error("error connecting to MongoDB");
    });
    const col = client.db("cse341-w5").collection("company");

    const filter = { _id: ObjectId(req.params.companyId) };

    var newData = validateData(req.body);

    const update = {
      $set: newData
    };

    const response = await col.updateOne(filter, update).catch((err) => {
      throw new Error("error updating company");
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
  client.close();
};

module.exports.deleteCompany = async (req, res, next) => {
  // #swagger.description = 'delete a Company'
  // #swagger.tags = ['Company']
  // #swagger.produces = ['application/json']
  // #swagger.parameters['companyId'] = { description: 'The Company ID' }
  /* #swagger.responses[200] = {
      description: 'Sucessfully deleted a company, sends back data of the deleted company',
      schema: { $ref: '#/definitions/company' }
    } */
  // #swagger.responses[400] = { description: 'Invalid Request'}
  var client;
  try {
    //make mongodb connection
    client = await mongo.connectToMongoDB().catch((err) => {
      throw new Error("error connecting to MongoDB");
    });
    const col = client.db("cse341-w5").collection("company");

    //define filter
    const filter = { _id: ObjectId(req.params.companyId) };

    const response = await col.deleteOne(filter).catch((err) => {
      throw new Error("error deleting company");
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
  client.close();
};
