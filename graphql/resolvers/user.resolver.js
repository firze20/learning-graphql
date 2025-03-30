import { UserService } from "../../services/user.service.js";

export default {
    Query: {
        user: (_, { id }) => UserService.getUserById(id),
        users: () => UserService.getUsers()
    },
    User: {
        group: (user) => user.group()
    }
};

