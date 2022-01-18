import { useEffect, useState } from "react";
import { IProjectDetails, ITaskDetails, ITasklistDetails } from "interfaces";
import dummyProjects from "dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

export const useProjectTasklists = () => {
  const [project, setProject] = useState<IProjectDetails>({
    id: NaN,
    name: "",
    task_lists: [],
  });
  const retrieveTasklists = async () => {
    //TODO get only user projects
    // const projectsResponse = await ProjectService.getProjects();
    setTimeout(() => {
      setProject(dummyProjects[0]);
    }, 30);
  };

  const addTasklist = (tasklist: ITasklistDetails) => {
    if (project) {
      setProject((prevState) => ({
        ...prevState,
        task_lists: [...prevState.task_lists, tasklist],
      }));
    }
  };

  const addTask = (task: ITaskDetails) => {
    if (project) {
      setProject((prevState) => ({
        ...prevState,
        task_lists: prevState.task_lists.map((tasklist) => {
          if (tasklist.id === task.task_list_id) {
            return {
              ...tasklist,
              tasks: [...tasklist.tasks, task],
            };
          }
          return tasklist;
        }),
      }));
    }
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
    }
  };

  useEffect(() => {
    retrieveTasklists().catch(console.log);
  }, []);

  return { project, setProject, addTasklist, addTask, removeTasklistById };
};
