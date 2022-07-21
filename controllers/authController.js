const axios = require('axios').default;
const mongo = require('./mongo.js');
const saltRounds = 10;

module.exports.auth = (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'The path that redirects to a url for oauth logging in'
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_ID}`;

    try{
        res.redirect(url);
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

        //console.dir(req.session);
    }catch(err){next(err)}
}

module.exports.logout = async(req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'The path that deletes the session'
    try{
        req.session = null;
        res.redirect('/login');
    }catch(err){next(err)}
}

module.exports.signup = async(req, res, next) => {
    try{
        client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        console.dir(req.body);

        const search = await col.findOne({username: req.body.username}).catch(err => {throw new Error('error getting user from MongoDB');});
        if(search){
            console.dir(search);
            res.status(400).send('username already exists');
            return;
        }
        var bcrypt = app.get('bcrypt');

        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            req.body.password = hash;

            req.body.createdDate = Date.now();

            const result = await col.insertOne(req.body).catch(err => {throw new Error('error adding user to MongoDB');});

        });

    }catch(err){next(err)}
}


module.exports.login = async(req, res, next) => {
    try{
        req.session.loggedIn = true;

        //connect to mongo
        var client = await mongo.connectToMongoDB().catch(err => {throw new Error('error connecting to MongoDB');});
        const col = client.db("cse341-w5").collection("users");

        //get user from database
        const user = await col.findOne({username: req.body.username}).catch(err => {throw new Error('error getting user from MongoDB');});
        if(!user){
            res.status(400).send('username does not exist');
            return;
        }
        var bcrypt = app.get('bcrypt');
        //compare password
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                req.session.user = {
                    name : user.username,
                    id : user.id
                }
                res.status(200).send();
            }else{
                res.status(400).send('password is incorrect');
            }
        });
    }catch(err){next(err)}
}