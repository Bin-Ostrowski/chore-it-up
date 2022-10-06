const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const choreSchema = new Schema({
    choreName: {
        type: String,
        required: true,
        minLength: 1,
    },
    choreBody: {
        type: String,
        required: false,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormat(timeStamp),
    },
    username: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
    },
});

const Chore = model('Chore', choreSchema);

module.exports = Chore;