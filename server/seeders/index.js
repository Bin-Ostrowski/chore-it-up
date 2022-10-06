import user from './user-seeds';
import group from './group-seeds';

const seedAll = async () => {
    await user();
    console.log(`Users seeded`);
    await group();
    console.log(`Groups seeded`);
};

seedAll();
