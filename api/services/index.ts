import * as UserService from "./user.service";
import * as ProjectService from "./project.service";
import * as TaskService from "./task.service";

// More hooks/utils will be added in the future and this could
// lead to confusing imports if there is a default
// eslint-disable-next-line import/prefer-default-export
export { UserService, ProjectService, TaskService };
