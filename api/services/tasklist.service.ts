import { prisma } from "../utils/db_client";

// maybe make interafaces comon
interface ITasklistDetails {
  id: number;
  name: string;
  project_id: number;
  tasks?: any[];
  // TODO: fix it later maybe include in the backend response tasks
}

async function getTasklistById(tasklist_id: number) {
  return await prisma.task_lists.findMany({
    where: {
      id: tasklist_id,
    },
    select: {
      id: true,
      name: true,
      project_id: true,
      tasks: {
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
      },
    },
  });
}
async function createTasklist(project_id: number, name: string) {
  return await await prisma.task_lists.create({
    data: {
      name: name,
      project_id: project_id,
      tasks: {
        create: [],
      },
    },
  });
}

async function deleteTasklist(tasklist_id: number) {
  return await prisma.task_lists.delete({
    where: {
      id: tasklist_id,
    },
  });
}

async function updateTasklist(
  tasklist_id: number,
  name: string,
  project_id?: number
) {
  return await prisma.task_lists.update({
    where: {
      id: tasklist_id,
    },
    data: {
      name: name,
      project_id: project_id,
    },
  });
}

async function getTasklistsByProjectId(project_id: number) {
  return await prisma.task_lists.findMany({
    where: {
      project_id: project_id,
    },
    select: {
      id: true,
      name: true,
      project_id: true,
    },
  });
}

export {
  getTasklistsByProjectId,
  getTasklistById,
  createTasklist,
  deleteTasklist,
  updateTasklist,
};
