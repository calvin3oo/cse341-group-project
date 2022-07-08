const axios = require('axios').default;

module.exports.auth = async(req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'The path that redirects to a url for oauth logging in'
    try{
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_ID}`);
    }catch(err){next(err)}
}

module.exports.oauthcallback = async(req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'The path that oauth calls back to with the code for getting a users token'
    try{
        req.session.loggedIn = true;

        //use the code to get access token
        const token = (await axios.post('https://github.com/login/oauth/access_token', { 
            code : req.query.code,
            client_secret : process.env.OAUTH_SECRET,
            client_id : process.env.OAUTH_ID
        },{
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }).catch(err => {
            throw new Error('error getting access token');
        })).data.access_token;

        const user = (await axios.get('https://api.github.com/user', { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }).catch(err => {
            throw new Error('error getting github user');
        })).data;

        req.session.user = {
            name : user.login,
            id : user.id
        }

        //create user in database
        var client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        await col.insertOne(req.session.user).catch(err => {throw new Error('error adding user to MongoDB');});
        client.close();

        console.dir(req.session);
        res.redirect('/');
    }catch(err){next(err)}
}

module.exports.logout = async(req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'The path that deletes the session'
    try{
        req.session = null;
        res.status(200).send();
    }catch(err){next(err)}
}