const { Schema, model } = require('mongoose');
const User = require('./User');
const Chore = require('./Chores');

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    chores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chore',
            required: true,
        },
    ],
});

const Group = model('Group', groupSchema);

module.exports = Group;
