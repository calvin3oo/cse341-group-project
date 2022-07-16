// const mongoose = require('mongoose');

//Work in Progress:
const Group= {

    name:  {
        required: false,
        editable: true,
    },

    userIDs: {
        required: false,
        editable: true,
    },
    members: {
        required: false,
        editable: true,
    },
}

module.exports = {
    "model":Group
};