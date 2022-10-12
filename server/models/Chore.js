const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const User = require('./User');

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
        // ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
});

const Chore = model('Chore', choreSchema);

module.exports = Chore;
