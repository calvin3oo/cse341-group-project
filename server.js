//allows to use environment variables in .env file
require('dotenv').config();
const bcrypt = require('bcryptjs');


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

app.set('view engine', 'ejs'); //using ejs
app.use(cors());
app.use(express.static(__dirname + '/static'));  //static files

//http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

//make request bodies into json 
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    //cors allowing from requsets from react app
    .use((req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        next();
    });

// Listen for requests
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log("Now listening for connection on port: " + app.get("port"));
});
app.set("bcrypt", bcrypt);

app.use(cookieSession({
    name: 'session',
    secret: 'Ti6Y4mFqAYRlGfzz',

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//ROUTES
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/sign-up', (req, res) => {
    res.render('signup');
});

//login stuff
app.use('/auth', require('./routes/auth.js'));

// middleware to test if authenticated
app.use((req, res, next) => {
    if (req.session?.loggedIn) next();
    else res.redirect('/login');
});


app.use('/todo', require('./routes/todo'));
app.use('/user', require('./routes/user'));
app.use('/group', require('./routes/group'));
app.use('/company', require('./routes/company'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => { res.render('404'); });



//Error Handling (after routes)
app.use((err, req, res, next) => {
    console.log(`BONK \n URL: ${req.originalUrl}\n ERROR: ${err.error || err.message || err}`);
    res.status(400).send(err.error || err.message || err);
});

