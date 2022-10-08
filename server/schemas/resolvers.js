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
                    .populate('group');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find().populate('group');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('group');
        },
        groups: async () => {
            return Group.find()
                .populate('users')
                .populate('chores')
                .populate('chores');
        },
        group: async (parent, { groupName }) => {
            return Group.findOne({ groupName })
                .populate('users')
                .populate('chores');
        },
        chores: async () => {
            return Chore.find().populate('group');
        },
        chore: async (parent, { choreName }) => {
            return Chore.findOne({ choreName }).populate('group');
        },
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
                    { group: group._id },
                    { new: true }
                );

                const hostUser = await Group.findByIdAndUpdate(
                    { _id: group._id },
                    { $push: { users: context.user._id } },
                    { new: true }
                );

                return { group, hostUser };
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addUserToGroup: async (parent, { userId, groupId }, context) => {
            if (context.user) {
                const updateGroup = await Group.findByIdAndUpdate(
                    { _id: groupId },
                    { $push: { users: userId } },
                    { new: true }
                );
                const updateUser = await User.findByIdAndUpdate(
                    { _id: userId },
                    { group: groupId },
                    { new: true }
                );

                return { updateGroup, updateUser };
            }

            throw new AuthenticationError('You need to be logged in');
        },
        addChore: async (parent, args, context) => {
            if (context.user) {
                const chore = await Chore.create({
                    ...args,
                    username: context.user.username,
                });

                await Group.findByIdAndUpdate(
                    { _id: args.group },
                    { $push: { chores: chore._id } },
                    { new: true }
                );

                console.log(chore);
                return chore;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
