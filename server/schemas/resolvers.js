import { Chore } from '../models';
import { AuthenticationError } from 'apollo-server-express';

const resolvers = {
    Query: {},
    Mutation: {
        addChore: async (parent, args, context) => {
            if (context.user) {
                const chore = await Chore.create({
                    ...args,
                    username: context.user.username,
                });

                await HTMLOptGroupElement.findByIdAndUpdate(
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

export default resolvers;
