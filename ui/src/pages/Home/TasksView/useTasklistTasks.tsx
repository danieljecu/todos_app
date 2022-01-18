import { useEffect, useState } from "react";
import { ITaskDetails } from "interfaces";
import dummyProjects from "../../../dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

export const useTasklistTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const retrieveTasklist = async () => {
    setTimeout(() => {
      setTasks(dummyProjects[0]?.task_lists); //tasklistId
    }, 30);
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
