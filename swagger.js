const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'calvin3oo-cse341-w5.herokuapp.com', //change this whenever on local or on live: calvin3oo-cse341-w5.herokuapp.com || localhost:5000
  schemes: ['https'], //Change from local or live: https || http
  definitions: {
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