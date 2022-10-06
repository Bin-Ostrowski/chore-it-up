const { Group, Users, Chore } = require('../models');

const groupData = [
    {
        groupName: 'Eeveelutions',
        Members: [
            {
                username: 'Espeon',
            },
            {
                username: 'Umbreon',
            },
            {
                username: 'Flareon',
            },
            {
                username: 'Vaporeon',
            },
        ],
        Chores: [
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
        ],
    },
    {
        groupName: 'Ralts',
        Members: [
            {
                username: 'Kirlia',
            },
            {
                username: 'Gardevoir',
            },
            {
                username: 'Gallade',
            },
        ],
        Chores: [
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
            {
                choreName: '',
                assignedTo: '',
                choreBody: '',
                dueDate: '',
            },
        ],
    },
];

const seedGroup = () => groupData.bulkCreate(groupData);

module.exports = seedGroup;
