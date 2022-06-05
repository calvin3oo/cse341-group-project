
//not for actual use
module.exports.template = async(req, res, next) => {
    try{

    }catch(err){next(err)}
}

module.exports.home = async(req, res, next) => {
    try{
        console.dir(req.session);
        res.render('index');
    }catch(err){next(err)}
}

module.exports.auth = async(req, res, next) => {
    try{
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_ID}`);
    }catch(err){next(err)}
}

module.exports.oauthcallback = async(req, res, next) => {
    try{
        req.session.code = req.query.code;
        console.dir(req.session);
        res.render('index');
    }catch(err){next(err)}
}


module.exports.logout = async(req, res, next) => {
    try{
        req.session = null;
        res.status(200).send();
    }catch(err){next(err)}
}
