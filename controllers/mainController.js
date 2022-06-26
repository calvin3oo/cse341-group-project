const axios = require('axios').default;
const mongo = require('./mongo.js');

//not for actual use
module.exports.template = async(req, res, next) => {
    // #swagger.tags = ['Main']
    try{

    }catch(err){next(err)}
}

module.exports.home = async(req, res, next) => {
    // #swagger.tags = ['Main']
    try{
        console.dir(req.session);
        res.render('index');
    }catch(err){next(err)}
}
