import { useEffect, useState } from "react";
import { ITaskDetails } from "interfaces";
import { TaskService } from "services";

export const useTasklistTasks = (tasklistId: number) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const retrieveTasklist = async () => {
    try {
      const tasksResponse = await TaskService.getTasksByTasklistId(tasklistId);
      setTasks(tasksResponse.data);
      console.log("task;", tasksResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveTasklist().catch(console.error);
  }, []);

  const addTask = (newTask: ITaskDetails) => {
    TaskService.createTask(tasklistId, newTask)
      .then(retrieveTasklist)
      .catch(console.log);
  };

  const removeTaskById = (taskId: number) => {
    TaskService.deleteTaskById(taskId)
      .then(retrieveTasklist)
      .catch(console.log);
  };

  const updateTaskById = (taskId: number, task: ITaskDetails) => {
    TaskService.updateTaskById(taskId, task)
      .then(retrieveTasklist)
      .catch(console.log);

    // setTasks((prevState) =>
    //   prevState.map((t) => (t.id === task.id ? task : t))
    // );
  };

  return { tasks, setTasks, addTask, removeTaskById, updateTaskById };
};
