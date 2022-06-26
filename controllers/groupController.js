const  ObjectId = require('mongodb').ObjectId;

module.exports.getAllGroups = async (req, res, next) => {
    // #swagger.description = 'get All Groups'
    // #swagger.tags = ['Group']
    // #swagger.produces = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back array of groups',
      schema: { $ref: '#/definitions/groupsArray' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
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
}