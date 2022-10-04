import { Schema } from 'mongoose';
import dateFormat from '../utils/dateFormat';

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
    createdBy: {
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

const Chores = model('Chores', choreSchema);

module.exports = Chores;
