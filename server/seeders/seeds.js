const { User, Group, Chore } = require('../models');
const db = require('../config/connection');

db.once('open', async () => {
    await User.deleteMany();

    const user = await User.insertMany([
        {
            username: 'Espeon',
            email: 'espeon@test.com',
            password: 'test123',
            groups: [],
            chores: [],
        },
        {
            username: 'Umbreon',
            email: 'umbreon@test.com',
            password: 'test234',
            groups: [],
            chores: [],
        },
        {
            username: 'Flareon',
            email: 'flareon@test.com',
            password: 'test345',
            groups: [],
            chores: [],
        },
        {
            username: 'Vaporeon',
            email: 'vaporeon@test.com',
            password: 'test456',
            groups: [],
            chores: [],
        },
        {
            username: 'Kirlia',
            email: 'kirlia@test.com',
            password: 'test567',
            groups: [],
            chores: [],
        },
        {
            username: 'Gardevoir',
            email: 'gardevoir@test.com',
            password: 'test678',
            groups: [],
            chores: [],
        },
        {
            username: 'Gallade',
            email: 'gallade@test.com',
            password: 'test789',
            groups: [],
            chores: [],
        },
    ]);

    console.log('users seeded');

    await Group.deleteMany();

    const group = await Group.insertMany([
        {
            groupName: 'Eeveelutions',
            users: [
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
            chores: [],
        },
        {
            groupName: 'Ralts',
            users: [
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
            chores: [],
        },
    ]);

    console.log('groups seeded');

    process.exit();
});
