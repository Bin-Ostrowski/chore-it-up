const { User, Group, Chore } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User.findOne({
                    _id: context.user._id,
                })
                    .select('-_v -password')
                    .populate('groups');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        groups: async () => {
            return Group.find().populate('users');
        },
        group: async (parent, { groupName }) => {
            return Group.findOne({ groupName }).populate('users');
        },
        chores: async () => {
            return Chore.find();
        },
        // add single chore later
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = User.create(args);
            const token = signToken(user);

            // add token to return
            return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            if (!password) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { user, token };
        },
        addGroup: async (parent, args, context) => {
            if (context.user) {
                const group = await Group.create({
                    ...args,
                    username: context.user.username,
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { group: group._id } },
                    { new: true }
                );
                return group;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
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
