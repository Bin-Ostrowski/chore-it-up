const resolvers = {
    Query: {
        chores: async (parent, { group, groupName }) => {
            return Chore.find().sort({ dueDate: -1 });
        },
        chore: async (parent, { _id }) => {
            return Chore.findOne({ _id });
        },
    },
};

export default resolvers;
