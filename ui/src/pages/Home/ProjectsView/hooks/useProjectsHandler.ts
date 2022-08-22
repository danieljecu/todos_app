import { useEffect, useState } from "react";
import { IProjectDetails } from "interfaces";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ProjectService } from "services";
import { toast } from "react-toastify";

interface ProjectsHandlerReturnType {
  projects: IProjectDetails[];
  addProject: (data: IProjectDetails) => void;
  removeProjectById: (id: number) => void;
  updateProjectById: (id: number, projectName: string) => void;
  onDragEnd: any;
  retrieveProjects: any;
  error: string;
}

export const useProjectsHandler = (): ProjectsHandlerReturnType => {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);
  const [error, setError] = useState<string>("test error");

  const retrieveProjects = async () => {
    //TODO get only user's projects
    try {
      const projectsResponse = await ProjectService.getProjects();
      setProjects(projectsResponse.data);
    } catch (err) {
      // if (e instanceof Error) {
      // setError(error);
      setError("401 (Unauthorized) to retrieve projects");
      console.error(err);
      alert("error trying to retrieveProjects " + err);
    }
  };

  console.log("projects", projects);
  useEffect(() => {
    retrieveProjects();
  }, [retrieveProjects, setError, error]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;
    if (source.index === destination?.index) {
      return;
    }
    setProjects((oldProj) =>
      oldProj.map((e, i) => {
        if (i === source.index) {
          return oldProj[destination?.index || 0];
        }
        if (i === destination?.index) {
          return oldProj[source?.index || 0];
        }
        return e;
      })
    );
  };

  const addProject = (newProject: IProjectDetails) => {
    // TODO: improvement
    // project id is random first time. maybe just replace the id in the state
    // setProjects((state) => [...state, newProject]);
    ProjectService.createProject(newProject)
      .then(retrieveProjects)
      .catch(console.log);

    console.log("newProject", newProject);
  };

  const removeProjectById = (projectId: number) => {
    console.log(`remove project ${projectId}`);
    setProjects((state) =>
      state.filter((project: IProjectDetails) => project.id !== projectId)
    );

    ProjectService.removeProjectById(projectId);
  };

  const updateProjectById = (projectId: number, projectName: string) => {
    ProjectService.updateProjectById(projectId, {
      id: projectId,
      name: projectName,
      task_lists: [],
    });
    // .then(retrieveProjects)
    // .catch(console.log);

    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, name: projectName };
      }
      return p;
    });

    setProjects(newProjects);
  };

  return {
    projects,
    error,
    retrieveProjects,
    onDragEnd,
    addProject,
    removeProjectById,
    updateProjectById,
  };
};
