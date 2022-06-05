//allows to use environment variables in .env file
require('dotenv').config()

// express framework
const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
//request session 
var cookieSession = require('cookie-session');
//Swagger documentation
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//main controller
const mainController = require('./controllers/mainController.js');

//mongo connection
// const mongo = require('./controllers/mongo.js');
// mongo.connectToMongoDB().catch(console.error);


app.set('view engine', 'ejs'); //using ejs
app.use(cors());
app.use(express.static(__dirname + '/static'));  //static files

//http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

//make request bodies into json 
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    //cors allowing from requsets from react app
    /*.use((req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        next();
    })*/;

// Listen for requests
app.set("port", process.env.PORT ); 
app.listen(app.get("port"), () => {
	console.log("Now listening for connection on port: " + app.get("port"));
});

app.use(cookieSession({
    name: 'session',
    secret: 'Ti6Y4mFqAYRlGfzz',
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

//ROUTES
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//login stuff
app.get('/auth', mainController.auth);
app.get('/oauth-callback', mainController.oauthcallback);

// middleware to test if authenticated
app.use((req, res, next) => {
    if (req.session?.code) next()
    else res.redirect('/auth');
});

app.get('/', mainController.home);
app.get('/logout', mainController.logout);

app.use('/todos', require('./routes/todos.js'));



//Error Handling (after routes)
app.use((err, req, res, next) => {
	console.log(`BONK \n URL: ${req.originalUrl}\n ERROR: ${err.error || err.message || err}`);
	res.status(400).send(err.error || err.message || err);
});

