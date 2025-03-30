import Models from "../models/index";

const {User} = Models;

export const UserService = {
    getUserById: async (id) => await User.findById(id),
    getUsers: async () => await User.find(),
}

