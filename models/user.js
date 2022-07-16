// const mongoose = require('mongoose');

//Work in Progress:
const User= {

    userFirstName: {        
        required: false,
        editable: true
    },

    userLastName:{
        required: false,
        editable: true
    },

    userEmail:{
        required: false,
        editable: true
    },

    userBirthdate:{
        required: false,
        editable: true
    },

    userPosition:{
        required: false,
        editable: true
    },

    userProfilePicture:{
        required: false,
        editable: true
    },

    userTodoPermissions:{
        required: false,
        editable: true
    }

}

module.exports = {
    "model":User
};