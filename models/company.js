// const mongoose = require('mongoose');

//Work in Progress:
const company= {

    companyName: {
        required: false,
        editable: true,
    },

    companyEmail: {
        required: false,
        editable: true,
    },

    companyPhone: {
        required: false,
        editable: true,
    },

    companyURL: {
        required: false,
        editable: true,
    },

    companyStatus: {
        required: false,
        editable: true,
    },

    companyTodoPermissions : {
        required: false,
        editable: true,
    },

    companyActiveUsers : {
        required: false,
        editable: true,
    },

}

module.exports = {
    "model":company
};