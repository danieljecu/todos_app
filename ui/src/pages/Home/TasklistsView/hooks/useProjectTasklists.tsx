import { useEffect, useState } from "react";
import { IProjectDetails, ITaskDetails, ITasklistDetails } from "interfaces";
import dummyProjects from "dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ProjectService, TasklistService } from "services";

// i want something like a set project action
export const useProjectTasklists = (projectId: number) => {
  const [project, setProject] = useState<IProjectDetails>({
    id: NaN,
    name: "",
    task_lists: [],
  });
  const retrieveTasklists = async () => {
    //TODO get only user projects
    const projectResponse = await ProjectService.getProject(projectId);
    setProject(projectResponse.data);
  };

  console.log("useProjectTasklists", project);
  const addTasklist = (newTasklist: ITasklistDetails) => {
    if (project) {
      setProject((prevState) => ({
        ...prevState,
        task_lists: [...prevState.task_lists, newTasklist],
      }));
    }
    TasklistService.createTasklist(newTasklist);
  };

  const addTask = (task: ITaskDetails) => {
    console.log("not yet supported");
    // if (project) {
    // setProject((prevState) => ({
    //   ...prevState,
    //   task_lists: prevState.task_lists.map((tasklist) => {
    //     if (tasklist.id === task.task_list_id) {
    //       return {
    //         ...tasklist,
    //         tasks: [...tasklist.tasks, task],
    //       };
    //     }
    //     return tasklist;
    //   }),
    // }));
    // }
  };

  const removeTasklistById = (tasklistId: number) => {
    if (project) {
      setProject((prevState) => ({
        ...prevState,
        task_lists: prevState.task_lists.filter(
          (tasklist) => tasklist.id !== tasklistId
        ),
      }));
      //TODO: push to the api
      // TasklistService.deleteTasklist(tasklistId);
    }
  };

  useEffect(() => {
    retrieveTasklists().catch(console.log);
  }, []);

  return { project, setProject, addTasklist, addTask, removeTasklistById };
};
