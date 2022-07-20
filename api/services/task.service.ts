import { prisma } from "../utils/db_client";

async function getTasksByTasklistId(tasklistId: string | undefined) {
  return await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      due_date: true,
      created_at: true,
      comments: true,
      task_list_id: true,
      task_status_id: true,
    },
    where: {
      task_list_id: tasklistId ? { equals: Number(tasklistId) } : undefined,
    },
  });
}
async function getTask(task_id: string) {
  return await prisma.tasks.findUnique({
    where: {
      id: parseInt(task_id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      due_date: true,
      created_at: true,
      task_list_id: true,
      task_status_id: true,
    },
  });
}

async function createTask(
  title: string,
  description: string,
  due_date: string,
  task_list_id: number,
  task_status_id: number
) {
  return await prisma.tasks.create({
    data: {
      title: title,
      description: description,
      due_date: due_date,
      created_at: new Date(),
      task_list_id: task_list_id,
      task_status_id: task_status_id,
    },
  });
}

async function updateTaskById(
  task_id: string,
  title: string,
  description: string,
  due_date: string,
  task_list_id: number,
  task_status_id: number
) {
  return await prisma.tasks.update({
    where: {
      id: parseInt(task_id),
    },
    data: {
      title: title,
      description: description,
      due_date: due_date,
      task_list_id: task_list_id,
      task_status_id: task_status_id,
    },
  });
}

async function deleteTaskById(taskId: string) {
  return await prisma.tasks.delete({
    where: {
      id: parseInt(taskId),
    },
  });
}

export {
  getTasksByTasklistId,
  getTask,
  createTask,
  deleteTaskById,
  updateTaskById,
};
