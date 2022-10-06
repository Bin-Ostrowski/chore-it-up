const user = require('./user-seeds');
const group = require('./group-seeds');

const seedAll = async () => {
    await user();
    console.log(`Users seeded`);
    await group();
    console.log(`Groups seeded`);
};

seedAll();
