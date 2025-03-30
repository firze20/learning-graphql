import { GroupService } from "../../services/group.service.js";

export default {
    Query: {
        group: (_, { id }) => GroupService.getGroupById(id),
        groups: () => GroupService.getGroups()
    }
};
