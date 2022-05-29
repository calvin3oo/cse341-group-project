

//Work in Progress:
module.exports.model = {
    "name": {
        type: "string",
        required: true,
        editable: true,
    },
    "priorityLevel": {
        type: "number",
        required: true,
        editable: true,
    },
    "due": {
        type: "string",
        required: true,
        editable: true,
    },
    "createdDate": {
        type: "string",
        required: false,
        editable: false,
    },
    "creator": {
        type: "string",
        required: false,
        editable: false,
    },
    "responsible": {
        type: "string",
        required: true,
        editable: true,
    },
    "status": {
        type: "string",
        required: true,
        editable: true,
    },
    "feedEntry": {
        type: "string",
        required: false,
        editable: false,
    },
    "comment": {
        type: "string",
        required: false,
        editable: true,
    },
    "feed": {
        type: "array",
        required: false,
        editable: false,
    },
    "description": {
        type: "string",
        required: true,
        editable: true,
    },
};
