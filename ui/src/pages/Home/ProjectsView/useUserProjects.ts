/*
I will leave leave like this for now, but I will add a comment later
- TODO get only user projects
*/

import  { useEffect, useState } from "react";
import { IProjectDetails, ITasklistDetails } from "../../../interfaces";
// import styled from 'styled-components';

import { ProjectService, TasklistService, TaskService } from "../../../services";

export const useUserProjects = () => {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);
  const [tasklists, setTasklists] = useState<ITasklistDetails[]>([]);

  //project, tasklist, projectsWithtasklist

  // array of arrays of tasklists
  const retrieveProjects = async () => {
    //TODO get only user projects
    const projectsResponse = await ProjectService.getProjects();
    setProjects(projectsResponse.data);
    if (projectsResponse.data.length > 0) {
      const arrayOfProjectTasklists = await Promise.all(
        projectsResponse.data.map(async (project) =>
          TasklistService.getTasklistsByProjectId(project.id)
        )
      );

      //return tasklists

      // const projectWithTasklists = {
      //   projectId: project.id,
      //   projectName: project.name,
      //   tasklists: response,
      // };
      //  const tasks =
      //   arrayOfProjectTasklists.map(async (projectTasklists) =>

      //   projectTasklists.map(async (tasklist) =>
      //     TaskService.getTasksByTasklistId(tasklist.id))

      //   );
      // console.log("tasks",tasks);

      console.log("temp", arrayOfProjectTasklists);
    }
  };

  // move tasklists into project
  // VER 1
  const retrieveProjects1 = async () => {
    const projectsResponse = await ProjectService.getProjects();

    setProjects(projectsResponse.data);
    if (projectsResponse.data.length > 0) {
      // projectsResponse.data.map(project => retrieveTasklists(project.id));

      const projectsWithTasklists =
        //iterate over project ids and call retrieveTasklists for every project and add its tasklists
        projectsResponse.data.map(async (project) => {
          //retrieve tasklists for each project
          const response = await TasklistService.getTasklistsByProjectId(
            project.id
          );
          //add it to the tasklists array
          // setTasklists((state)=> tasklists.concat(response.data));

          // create project with tasklists object
          const projectWithTasklists = {
            projectId: project.id,
            projectName: project.name,
            tasklists: response,
          };

          console.log(projectWithTasklists);

          return projectWithTasklists;
        });

      console.log(projectsWithTasklists);
      // setProjects(projectsWithTasklists);
    }
  };
  // VER 3
  // const retrieveProjectWithTasklists = async (projectId: number) => {
  //   const tasklistResponse = await TasklistService.getTasklistsByProjectId(projectId);
  //   setTasklists(tasklistResponse.data);

  //   return tasklistResponse.data;
  //   console.log(tasklistResponse.data);

  //   return Promise.all(
  //     projects.map(project => {
  //       return retrieveProjectWithTasklists(project.id);
  //     })
  //   );

  // };

  useEffect(() => {
    retrieveProjects();
  }, []);

  // console.log("projects", projects);

  return [projects,setProjects];
};

// const DataWrapper = (props) => {

//     const { data, children } = props;

//     return (
//         <div className="data-wrapper">
//         {children(data)}
//         </div>
//     );
//     }
