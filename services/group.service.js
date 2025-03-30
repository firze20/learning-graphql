import Models from "../models/index.js";

const {Group} = Models;

export const GroupService = {
    getGroupById: async (id) => await Group.findById(id),
    getGroups: async () => await Group.find()
}