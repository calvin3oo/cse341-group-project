const path = require('path');

module.exports = [
    {
      entry: './Static/js/index.js',              //entry
      output: {
        path: path.resolve(__dirname, 'Static/dist'),    //output where to put/what to name webpack folder
        filename: 'index.js'
      },
    },
];