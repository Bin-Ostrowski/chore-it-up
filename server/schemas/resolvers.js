const { User, Group, Chore } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth);

const resolvers = {
    Query: {
        //gets username hopefully...
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        groups: async() => {
            return Group.find();
        },
        group: async(parent, { groupName }) => {
            return Group.findOne({ groupName });
        },
        chores: async() => {
            return Chore.find();
        }
        // add single chore later
    },
    Mutation: {
        // addUser: async (parent, args) => {
        //     const user = User.create(args);
            //const token = signToken(user);

            // // add token to return
            // return { user };
        // },
        // login: async (parent, { email, password }) => {
        //     const user = await User.findOne({ email });

        //     if (!user) {
        //         throw new AuthenticationError('Incorrect credentials');
        //     }

        //     if (!correctPw) {
        //         throw new AuthenticationError('Incorrect credentials');
        //     }

        //     return { user };
        // },
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
