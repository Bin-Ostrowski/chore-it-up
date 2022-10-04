import user from './user-seeds';
import chore from './chore-seeds';
import group from './group-seeds';

const seedAll = async () => {
    await user();
    console.log(`Users seeded`);
    await group();
    console.log(`Groups seeded`);
    await chore();
    console.log(`Chores seeded`);
};

seedAll();
