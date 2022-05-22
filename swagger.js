const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'calvin3oo-cse341-w5.herokuapp.com',
  schemes: ['https'],
  definitions: {
    addTodo:{
      $name: "name",
      $priorityLevel: "3",
      $due: "5/21/2022",
      $creator: "user1",
      $responsible: "user1",
      $status: "New", 
      $feed: [],
      $description: "This is a new Todo",
    },
  }
};


const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your project's root file
});