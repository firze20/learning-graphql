import { UserService } from "../../services/user.service";

export const userResolvers = {
    Query: {
        user: (_, { id }) => UserService.getUserById(id),
        users: () => UserService.getUsers()
    },
    User: {
        group: (user) => user.group()
    }
};

