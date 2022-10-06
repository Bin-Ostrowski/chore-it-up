import { Schema, model } from 'mongoose';

const groupsModel = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    Members: [{ ref: Users }],
    Chores: [{ ref: Chores }],
});

const Groups = model('Groups', groupsModel);

module.exports = Groups;
