import { Schema, model } from 'mongoose';
import { Users, Chores } from '../models';

const groupModel = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    Users: [
        { 
            type: Schema.Types.ObjectId,
            username: String,
            required: true,
            ref: Users,
        }
    ],
    Chores: [
        { 
            type: Schema.Types.ObjectId, 
            ref: Chores 
        }
    ],
});

const Group = model('Group', groupModel);

module.exports = Group;
