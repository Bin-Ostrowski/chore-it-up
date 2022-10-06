import { Schema, model } from 'mongoose';
import { Users, Chores } from '../models';

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
