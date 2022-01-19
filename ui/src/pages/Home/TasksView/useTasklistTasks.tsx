import { useEffect, useState } from "react";
import { ITaskDetails } from "interfaces";
import dummyProjects from "../../../dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ProjectService, TasklistService, TaskService } from "services";


export const useTasklistTasks = (tasklistId: number) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const retrieveTasklist = async () => {

    const tasksResponse = await TaskService.getTasksByTasklistId(tasklistId);
    setTasks(tasksResponse.data);
    console.log("task;",tasksResponse.data);
  };
  

  useEffect(() => {
    retrieveTasklist().catch(console.log);
  }, []);

  const addTask = (task: ITaskDetails) => {
    if (tasks) {
      setTasks((prevState) => [...prevState, task]);
    }
  };

  // const updateTask = (task: ITaskDetails) => {
  //   if (tasks) {
  //     setTasks((prevState) =>
  //       prevState.map((t) => (t.id === task.id ? task : t))
  //     );
  //   }
  // }; 

  const removeTaskById = (taskId: number) => {
    if (tasks) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  return { tasks, setTasks, addTask, removeTaskById};
};
