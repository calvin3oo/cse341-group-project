const  ObjectId = require('mongodb').ObjectId;

module.exports.getAllCompanies = async (req, res, next) => {
    // #swagger.description = 'get All Companies'
    // #swagger.tags = ['Company']
    // #swagger.produces = ['application/json']
    /* #swagger.responses[200] = {
      description: 'Sends back array of companies',
      schema: { $ref: '#/definitions/companiesArray' }
    } */
    // #swagger.responses[400] = { description: 'Invalid Request'} 
}
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
}
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
}
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
}
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
}