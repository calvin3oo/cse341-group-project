const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const local = false;

var host = local? 'localhost:5000': 'calvin3oo-cse341-w5.herokuapp.com';
var method = local? 'http':'https';

const doc = {
  securityDefinitions: {
    oAuth2: {
      type: 'oauth2',
      authorizationUrl: `${method}://${host}/auth`,
      flow: 'authorizationCode'
    }
  },
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: host,
  schemes: [method], 
  definitions: {
    addUser:{ 
      $id: "id",
      $name: "name",
    },
    editUser:{
      $name:"name",
    },
    addTodo:{
      $name: "name",
      $priorityLevel: "3",
      $due: "5/21/2022",
      $responsible: "user1",
      $status: "New",
      $description: "This is a new Todo",
      comment: "feed Entry",
    },
    editTodo:{
      name: "name",
      priorityLevel: "3",
      due: "5/21/2022",
      responsible: "user1",
      status: "New", 
      description: "This is a new Todo",
      comment: "feed Entry",
    }
  }
};


const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)/*.then(() => {
    require('./server.js'); // Your project's root file
});*/