const { Group, User, Chore } = require('../models');

const userData = [
    {
        username: 'Espeon',
        email: 'espeon@test.com',
        password: 'test123',
        Groups: [
            {
                groupName: 'Eeveelutions',
            },
        ],
        Chores: [],
    },
    {
        username: 'Umbreon',
        email: 'umbreon@test.com',
        password: 'test234',
        Groups: [
            {
                groupName: 'Eeveelutions',
            },
        ],
        Chores: [],
    },
    {
        username: 'Flareon',
        email: 'flareon@test.com',
        password: 'test345',
        Groups: [
            {
                groupName: 'Eeveelutions',
            },
        ],
        Chores: [],
    },
    {
        username: 'Vaporeon',
        email: 'vaporeon@test.com',
        password: 'test456',
        Groups: [
            {
                groupName: 'Eeveelutions',
            },
        ],
        Chores: [],
    },
    {
        username: 'Kirlia',
        email: 'kirlia@test.com',
        password: 'test567',
        Groups: [
            {
                groupName: 'Ralts',
            },
        ],
        Chores: [],
    },
    {
        username: 'Gardevoir',
        email: 'gardevoir@test.com',
        password: 'test678',
        Groups: [
            {
                groupName: 'Ralts',
            },
        ],
        Chores: [],
    },
    {
        username: 'Gallade',
        email: 'gallade@test.com',
        password: 'test789',
        Groups: [
            {
                groupName: 'Ralts',
            },
        ],
        Chores: [],
    },
];

const seedUser = () => User.collection.insertMany(userData);

module.exports = seedUser;
