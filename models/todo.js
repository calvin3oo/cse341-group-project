

//Work in Progress:
const model = {
    "name": {
        type: "string",
        required: true,
    },
    "priorityLevel": {
        type: "Integer",
        required: true,
    },
    "due": {
        type: "string",
        required: true,
    },
    "creator": {
        type: "string",
        required: true,
    },
    "responsible": {
        type: "string",
        required: true,
    },
    "status": {
        type: "string",
        required: true,
    },
    "feed": {
        type: "string",
        required: true,
    },
    "description": {
        type: "string",
        required: true,
    },
};

module.exports(model);