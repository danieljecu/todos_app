import { useEffect, useState } from "react";
import { ITaskDetails } from "interfaces";
import { TaskService } from "services";
import { toast } from "react-toastify";

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
      .catch(console.error);
  };

  const removeTaskById = (taskId: number) => {
    const ToastId = toast.loading("Please wait...", {
      closeButton: true,
    });

    TaskService.deleteTaskById(taskId)
      .then(retrieveTasklist)
      .then((response) => {
        toast.update(ToastId, {
          render: `Deleted ${JSON.stringify(response)}`,
          type: "success",
          autoClose: 3000,
          isLoading: false,
          closeButton: true,
          icon: "🟢",
        });
      })
      .catch(console.error);
  };

  const updateTaskById = (taskId: number, task: ITaskDetails) => {
    const ToastId = toast.loading("Please wait...", {
      closeButton: true,
    });
    TaskService.updateTaskById(taskId, task)
      .then(retrieveTasklist)
      .catch((err) => {
        toast.update(ToastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        // if (err.response.status === 401) {
        //   toast.warn(JSON.stringify(err.response.data));
        // }
      });

    // setTasks((prevState) =>
    //   prevState.map((t) => (t.id === task.id ? task : t))
    // );
  };

  return { tasks, setTasks, addTask, removeTaskById, updateTaskById };
};
