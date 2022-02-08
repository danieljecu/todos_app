import * as UserService from "./user.service";
import * as AuthService from "./auth.service";
import * as ProjectService from "./project.service";
import * as TaskService from "./task.service";
import * as TasklistService from "./tasklist.service";

// More hooks/utils will be added in the future and this could
// lead to confusing imports if there is a default
// eslint-disable-next-line import/prefer-default-export
export {
  UserService,
  AuthService,
  ProjectService,
  TaskService,
  TasklistService,
};
