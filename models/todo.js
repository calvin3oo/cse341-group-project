// const mongoose = require('mongoose');

//Work in Progress:
const todo = {
    name: {
        required: true,
        editable: true,
    },
    priorityLevel: {
        required: true,
        editable: true,
    },
    due: {
        required: true,
        editable: true,
    },
    createdDate: {
        required: false,
        editable: false,
    },
    creator: {
        required: false,
        editable: false,
    },
    responsible: {
        required: true,
        editable: true,
    },
    status: {
        required: true,
        editable: true,
    },
    feedEntry: {
        required: false,
        editable: false,
    },
    comment: {
        required: false,
        editable: true,
    },
    feed: {
        required: false,
        editable: false,
    },
    description: {
        required: true,
        editable: true,
    },
};

module.exports = {
    "model":todo
};