import { useEffect, useState } from "react";
import { ITaskDetails } from "interfaces";
import dummyProjects from "../../../dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { TaskService } from "services";

export const useTasklistTasks = (tasklistId: number) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const retrieveTasklist = async () => {
    const tasksResponse = await TaskService.getTasksByTasklistId(tasklistId);
    setTasks(tasksResponse.data);
    console.log("task;", tasksResponse.data);
  };

  useEffect(() => {
    retrieveTasklist().catch(console.log);
  }, []);

  const addTask = (newTask: ITaskDetails) => {
    TaskService.createTask(tasklistId, newTask)
      .then(retrieveTasklist)
      .catch(console.log);

    // setTasks((prevState) => [...prevState, newTask]);
  };

  const removeTaskById = (taskId: number) => {
    TaskService.deleteTaskById(taskId)
      .then(retrieveTasklist)
      .catch(console.log);
  }

  // const updateTask = (task: ITaskDetails) => {
  //   if (tasks) {
  //     setTasks((prevState) =>
  //       prevState.map((t) => (t.id === task.id ? task : t))
  //     );
  //   }
  // };

 

  return { tasks, setTasks, addTask, removeTaskById };
};
