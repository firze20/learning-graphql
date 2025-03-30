import { GroupService } from "../../services/group.service";

export const groupResolvers = {
    Query: {
        group: (_, { id }) => GroupService.getGroupById(id),
        groups: () => GroupService.getGroups()
    }
};
