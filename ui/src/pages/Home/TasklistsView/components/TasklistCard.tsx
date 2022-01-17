import React from "react";
import {Link as ReactLink} from "react-router-dom";
import Link from '@mui/material/Link';
import styled from "styled-components";
import { ITaskDetails } from "interfaces/tasks";


interface TasklistCardProps {
    id: number;
    name: string;
    tasks?: any[];
}

export const TasklistCard: React.FC<TasklistCardProps> = ({id:tasklistId, name, tasks}) => {
    return (
        <ProjectCardContainer>
            <CardTitle>
                <Link to={`/tasklist/${tasklistId}`} component={ReactLink} underline={"none"}
                      color="black">{name} List</Link>
            </CardTitle>
            <CardBody>
                {tasks?.map(({id: taskId, title}: ITaskDetails) => (
                    <CardBodyItem key={taskId}>
                        <Link to={`/tasklist/${tasklistId}/task/${taskId}`} component={ReactLink} underline={"none"}
                          color="black">{title}</Link>
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
