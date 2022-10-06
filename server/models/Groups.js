import { Schema, model } from 'mongoose';
import { Users, Chores } from '../models';

const groupModel = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    Members: [{ ref: Users }],
    Chores: [{ ref: Chores }],
});

const Group = model('Group', groupModel);

module.exports = Group;
