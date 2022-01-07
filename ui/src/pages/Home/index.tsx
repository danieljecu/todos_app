import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import { IProjectDetails, ITasklistDetails } from "../../interfaces";
// import styled from 'styled-components';

import { Link } from "react-router-dom";
import { ProjectService, TasklistService } from "../../services";

const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  background-color: #a0a4ae;
  text-align: center;
`;

const Home = () => {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);
  const [tasklists, setTasklists] = useState<ITasklistDetails[]>([]);

  //project, tasklist, projectsWithtasklist

  // array of arrays of tasklists
  const retrieveProjects1 = async () => {
    const projectsResponse = await ProjectService.getProjects();
    setProjects(projectsResponse.data);
    if (projectsResponse.data.length > 0) {
      const temp = await Promise.all(
        projectsResponse.data.map((project) =>
          TasklistService.getTasklistsByProjectId(project.id)
        )
      );

      console.log("temp", temp);
    }
  };

  // move tasklists into project
  // VER 1
  const retrieveProjects = async () => {
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

  console.log("projects", projects);

  return (
    <AppWrapper className="App">
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
      {/* {tasklists && tasklists.map(({id,name})=> <li key={id}>
            <Link to={`/projects/0/taskslist/${id}`}>{name}</Link>
          </li>)} */}

      {projects &&
        projects.map(({ id, name, task_lists }) => (
          <div key={id}>
            <header className="App-header"> {name}</header>
            <ul>
              {task_lists &&
                task_lists.map((list :ITasklistDetails) => {
                  return <li key={list.id}>
                    <Link
                      to={`/projects/${list.project_id}/taskslist/${list.id}`}
                    >
                      {list.name}
                    </Link>
                  </li>;
                })}
            </ul>
          </div>
        ))}
    </AppWrapper>
  );
};

export default Home;
