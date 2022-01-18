import { useEffect, useState } from "react";
import { IProjectDetails } from "interfaces";
import dummyProjects from "../../../../dummydata/dummy";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

interface ProjectsHandlerReturnType {
  projects: IProjectDetails[];
  addProject: (data: IProjectDetails) => void;
  removeProjectById: (id: number) => void;
  updateProjectById: (id: number, projectName:string) => void;
  onDragEnd: any;
  retrieveProjects: any;
}

export const useProjectsHandler = (): ProjectsHandlerReturnType => {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);

  const retrieveProjects = async () => {
    //TODO get only user projects
    // const projectsResponse = await ProjectService.getProjects();
    await setTimeout(() => {
      setProjects(dummyProjects);
    }, 0);
  };

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
  useEffect(() => {
    retrieveProjects().catch(console.log);
  }, []);

  const addProject = (newProject: IProjectDetails) => {
    setProjects((state) => [...state, newProject]);
  };

  const removeProjectById = (projectId: number) => {
    console.log(`remove project ${projectId}`);
    setProjects((state) =>
      state.filter((project: IProjectDetails) => project.id !== projectId)
    );
  };

  type PartialProject = Partial<IProjectDetails>;

  const updateProjectById = (projectId: number, projectName: string) => {
    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, name: projectName };
      }
      return p;
    });
    setProjects(newProjects);
    // setProjects((state) => {
    //   const index = state.findIndex((p) => p.id === project.id);
    //   return [...state.slice(0, index), project, ...state.slice(index + 1)];
    //   });
  };

  return {
    projects,
    retrieveProjects,
    onDragEnd,
    addProject,
    removeProjectById,
    updateProjectById,
  };
};
