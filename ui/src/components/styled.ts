import styled from "styled-components";

const ProjectCardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const TasklistCardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const TaskContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  border-radius: 4px;
  margin: 0.5rem 0.2rem;
  overflow: hidden;
`;

const CardTitle = styled.div`
  /* background-color: #00d3ff; */
  padding: 0.33rem 1rem 0.33rem 1rem;
  border-bottom: 1px solid;
`;
const CardCreateTitle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #00d3ff;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  padding: 0.33rem 1rem 0.33rem 1rem;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.1rem;
`;

export {
  ProjectCardContainer,
  TasklistCardContainer,
  TaskContainer,
  CardTitle,
  CardCreateTitle,
  CardBody,
  CardBodyItem,
};
