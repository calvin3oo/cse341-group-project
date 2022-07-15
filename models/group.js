// const mongoose = require('mongoose');

//Work in Progress:
const Group= {

    groupName:  {
        required: false,
        editable: true,
    },

    groupLeadName: {
        required: false,
        editable: true,
    },
    groupLeadEmail: {
        required: false,
        editable: true,
    },

    groupLeadPhone: {
        required: false,
        editable: true,
    },

    activeGroupMembers: {
        required: false,
        editable: true,
    },
    groupStatus: {
        required: false,
        editable: true,
    },

    GroupPermissions: {
        required: false,
        editable: true,
    },
}

module.exports = {
    "model":Group
};