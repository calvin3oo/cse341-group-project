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
    title: 'TODOS Api Documentation',
    description: 'The api documentation for the TODOS group for CSE 341',
  },
  host: host,
  schemes: [method], 
  definitions: {
    companiesArray:[
      { 
        _id:"12345",
        name:"New Company"
      },
    ],
    company:{
      _id:"12345",
      name:"New Company"
    },
    updateCompany : {
      name:"New Company",
    },
    addCompany : {
      $name:"New Company",
    },
    groupsArray:[
      {
        _id:"12345",
        name:"New Group",
        members:[
          "123456789",
          "123456788"
        ]
      },
    ],
    group:{
      _id:"12345",
      name:"New Group",
      members:[
        "123456789",
        "123456788"
      ]
    },
    updateGroup : {
      name:"New Group",
      userIDsToAdd:["12345"],
      userIDsToRemove:["12345"],
    },
    addGroup : {
      $name:"New Group",
      userIDs:["12345"]
    },
    usersArray:[
      {
        _id:"123456",
        name:"billy bob"
      },
    ],
    user:{
      _id:"123456",
      name:"billy bob"
    },
    addUser:{ 
      $name: "name",
    },
    editUser:{
      $name:"name",
    },
    todosArray:[
      {
        _id:"1234567890",
        name: "first Todo",
        priorityLevel: "3",
        due: "5/21/2022",
        responsible: "user1",
        status: "New",
        description: "This is a Todo",
        createdDate:1656201934129,
        feed:["feed entry 1", "feed entry 2", "feed entry 3", "feed entry 4", "feed entry 5"],
      },
    ],
    todo:{
      _id:"1234567890",
      name: "name",
      priorityLevel: "3",
      due: "5/21/2022",
      responsible: "user1",
      status: "New",
      description: "This is a new Todo",
      createdDate:1656201934129,
      feed:["feed entry 1", "feed entry 2", "feed entry 3", "feed entry 4", "feed entry 5"],
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