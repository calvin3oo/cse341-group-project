// const mongoose = require('mongoose');

//Work in Progress:
const todo = {
    name: {
        type: String,
        required: true,
        editable: true,
    },
    priorityLevel: {
        type: Number,
        required: true,
        editable: true,
    },
    due: {
        type: String,
        required: true,
        editable: true,
    },
    createdDate: {
        type: Date,
        required: false,
        editable: false,
    },
    creator: {
        type: String,
        required: false,
        editable: false,
    },
    responsible: {
        type: String,
        required: true,
        editable: true,
    },
    status: {
        type: String,
        required: true,
        editable: true,
    },
    feedEntry: {
        type: String,
        required: false,
        editable: false,
    },
    comment: {
        type: String,
        required: false,
        editable: true,
    },
    feed: {
        type: Array,
        required: false,
        editable: false,
    },
    description: {
        type: String,
        required: true,
        editable: true,
    },
};

module.exports = {
    "model":todo
};