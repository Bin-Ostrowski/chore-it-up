const { User, Group, Chore } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        groups: async () => {
            return Group.find().populate('users');
        },
    },
    Mutation: {
        addChore: async (parent, args, context) => {
            if (context.user) {
                const chore = await Chore.create({
                    ...args,
                    username: context.user.username,
                });

                await Group.findByIdAndUpdate(
                    { _id: context.group._id },
                    { $push: { chores: chore._id } },
                    { new: true }
                );
                return chore;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
