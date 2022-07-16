// const mongoose = require('mongoose');

//Work in Progress:
const company= {

    name: {
        required: false,
        editable: true,
    },

    email: {
        required: false,
        editable: true,
    },

    phone: {
        required: false,
        editable: true,
    },

    URL: {
        required: false,
        editable: true,
    },

    status: {
        required: false,
        editable: true,
    },

    todoPermissions : {
        required: false,
        editable: true,
    },

    activeUsers : {
        required: false,
        editable: true,
    },

}

module.exports = {
    "model":company
};