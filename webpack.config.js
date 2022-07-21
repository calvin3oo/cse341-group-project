const path = require('path');

module.exports = [
    {
      entry: './static/js/index.js',              //entry
      output: {
        path: path.resolve(__dirname, 'static/dist'),    //output where to put/what to name webpack folder
        filename: 'index.js'
      },
    },
    {
      entry: './static/js/login.js',              //entry
      output: {
        path: path.resolve(__dirname, 'static/dist'),    //output where to put/what to name webpack folder
        filename: 'login.js'
      },
    },
    {
      entry: './static/js/signup.js',              //entry
      output: {
        path: path.resolve(__dirname, 'static/dist'),    //output where to put/what to name webpack folder
        filename: 'signup.js'
      },
    },
];