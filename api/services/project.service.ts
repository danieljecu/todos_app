import { deleteProject } from "../controllers/project";
import { prisma } from "../utils/db_client";

async function getProjectsWithTasklistIds() {
  return await prisma.projects.findMany({
    select: {
      id: true,
      name: true,
      task_lists: {
        select: {
          id: true,
          name: true,
          project_id: true,
        },
      },
    },
  });
}

async function getProjectById(project_id: string) {
  return await prisma.projects.findUnique({
    where: {
      id: parseInt(project_id),
    },
    select: {
      id: true,
      name: true,
      task_lists: {
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
      },
    },
  });
}

async function createProject(projectName: string) {
  return await prisma.projects.create({
    data: {
      name: projectName,
      // TODO: maybe pass optionally user_id; but using project_users.create
    },
  });
}

async function updateProject(project_id: string, projectName: string) {
  return await prisma.projects.update({
    where: {
      id: parseInt(project_id),
    },
    data: {
      name: projectName,
    },
  });
}

async function deleteProject(projectId: string) {
  return await prisma.projects.delete({
    where: {
      id: parseInt(projectId),
    },
  });
}
export {
  getProjectsWithTasklistIds,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
