import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import { IProjectDetails } from "../../interfaces";
// import styled from 'styled-components';

import {Link} from 'react-router-dom';
import { ProjectService } from "../../services";
import NavBar from './NavBar';
import ProjectsNav from './ProjectsNav';
import Button from '@mui/material/Button';


const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  background-color: #95979a;
  text-align: center;
`;

const Home = () => {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);


  const retrieveProjects = async () => {
    const response = await ProjectService.getProjects();
    setProjects(response.data);
  };

  useEffect(() => {
    retrieveProjects();
  }, []);



  return (
    <AppWrapper className="App">

      <NavBar/>
      <h1>Home</h1>
      <Button variant="contained">Hello World</Button>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
      {/* {projects  && <ProjectsNav projects={projects} />} */}
      {projects && projects.map(({id,name})=> <div key={id}>
        <header className="App-header"> {name}</header>
      </div>)}
    </AppWrapper>
  );
};

export default Home;

