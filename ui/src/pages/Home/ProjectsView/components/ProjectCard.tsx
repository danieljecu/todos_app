import React from "react";
import {Link as ReactLink} from "react-router-dom";
import Link from '@mui/material/Link';
import styled from "styled-components";


interface ProjectCardProps {
    id: string;
    title: string;
    items?: any[];

}

export const ProjectCard: React.FC<ProjectCardProps> = ({id: projectID, title, items}) => {
    return (
        <ProjectCardContainer>
            <CardTitle>
                <Link to={`/projects/${projectID}`} component={ReactLink} underline={"none"}
                      color="black">{title}</Link>
            </CardTitle>
            <CardBody>
                {items?.map(({id, name}) => (
                    <CardBodyItem>
                        <Link to={`/projects/${projectID}/${id}`} component={ReactLink} underline={"none"}
                          color="black">{name}</Link>
                    </CardBodyItem>)
                )}
            </CardBody>
        </ProjectCardContainer>
    );
};

const ProjectCardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const CardTitle = styled.div`
  background-color: #00d3ff;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`
const CardBodyItem = styled.div`
    margin: 0.3rem 0 0.3rem 0.3rem;
`
