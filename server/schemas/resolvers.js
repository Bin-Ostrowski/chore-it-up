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
                    // .populate('chores')
                    .populate('group');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find().populate('group').populate('chores');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .populate('group')
                .populate('chores');
        },
        groups: async () => {
            return Group.find().populate('users').populate('chores');
        },
        group: async (parent, { groupName }) => {
            return Group.findOne({ groupName })
                .populate('users')
                .populate('chores');
        },
        chores: async () => {
            return Chore.find().populate('group').populate('assignedTo');
        },
        chore: async (parent, { choreName }) => {
            return Chore.findOne({ choreName })
                .populate('group')
                .populate('assignedTo');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
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

                await Group.findByIdAndUpdate(
                    { _id: group._id },
                    { $push: { users: context.user._id } },
                    { new: true }
                );

                return group;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addUserToGroup: async (parent, { userId, groupId }, context) => {
            if (context.user) {
                const group = await Group.findByIdAndUpdate(
                    { _id: groupId },
                    { $addToSet: { users: userId } },
                    { new: true }
                ).populate('users');

                await User.findByIdAndUpdate(
                    { _id: userId },
                    { group: groupId },
                    { new: true }
                );

                return group;
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

                return chore;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeUserFromGroup: async (parent, { userId, groupId }, context) => {
            if (context.user) {
                const group = await Group.findByIdAndUpdate(
                    { _id: groupId },
                    { $pull: { users: userId } },
                    { new: true }
                );
                await User.findByIdAndUpdate(
                    { _id: userId },
                    { $unset: { group: groupId } },
                    { new: true }
                );
                return group;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeChore: async (parent, { choreId, groupId }, context) => {
            if (context.user) {
                const updateGroup = await Group.findByIdAndUpdate(
                    { _id: groupId },
                    { $pull: { chores: choreId } },
                    { new: true }
                );

                const updateChore = await Chore.findByIdAndRemove({
                    _id: choreId,
                });

                return { updateGroup, updateChore };
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateChore: async (parent, args, context) => {
            if (context.user) {
                const updateChore = await Chore.findByIdAndUpdate(
                    { _id: args.choreId },
                    args,
                    { new: true }
                );

                return updateChore;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        assignedChore: async (parent, { choreId, assignedId }, context) => {
            if (context.user) {
                const chore = await Chore.findByIdAndUpdate(
                    { _id: choreId },
                    { assignedTo: assignedId },
                    { new: true }
                ).populate('assignedTo');

                await User.findByIdAndUpdate(
                    { _id: assignedId },
                    { chores: choreId },
                    { new: true }
                );

                return chore;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
